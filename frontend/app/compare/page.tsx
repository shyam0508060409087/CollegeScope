'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import CompareTable from '@/components/CompareTable';
import { Scale, Search, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface College {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  type: string;
  fees: number;
  rating: number;
  placementRate: number;
  avgPackage: number;
  established: number;
  courses: { name: string; duration?: number; fees?: number }[];
  topRecruiter?: string[];
  image?: string | null;
}

function ComparePageInner() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [comparisonName, setComparisonName] = useState('');

  useEffect(() => {
    const ids = searchParams.get('ids');
    if (ids) {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      fetch(`${apiUrl}/api/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: ids.split(',') }),
      })
        .then(r => r.json())
        .then(setColleges)
        .catch(() => toast.error('Failed to load colleges'))
        .finally(() => setLoading(false));
    }
  }, [searchParams]);

  const handleRemove = (id: string) => {
    const updated = colleges.filter(c => c.id !== id);
    setColleges(updated);
    if (updated.length > 0) {
      const url = `/compare?ids=${updated.map(c => c.id).join(',')}`;
      window.history.replaceState({}, '', url);
    }
  };

  const handleSave = async () => {
    if (!session) {
      toast.error('Please sign in to save comparisons');
      return;
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const token = (session as any)?.user?.accessToken;
      const res = await fetch(`${apiUrl}/api/saved`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: 'comparison',
          collegeIds: colleges.map(c => c.id),
          name: comparisonName || colleges.map(c => c.name).join(' vs '),
        }),
      });
      if (!res.ok) throw new Error();
      toast.success('Comparison saved!');
    } catch {
      toast.error('Failed to save comparison');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-100 p-2 rounded-xl">
            <Scale className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Compare Colleges</h1>
        </div>
        <p className="text-gray-500">Side-by-side comparison of selected colleges</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      )}

      {!loading && colleges.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No colleges selected</h3>
          <p className="text-gray-500 mb-6">Go to the explore page and add colleges to compare</p>
          <Link href="/colleges" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <Search className="w-4 h-4" /> Browse Colleges
          </Link>
        </div>
      )}

      {!loading && colleges.length > 0 && (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <CompareTable colleges={colleges} onRemove={handleRemove} />
          </div>

          {/* Save Comparison */}
          <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Save className="w-4 h-4 text-blue-500" />
              Save This Comparison
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Comparison name (optional)"
                value={comparisonName}
                onChange={(e) => setComparisonName(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                {session ? 'Save' : 'Sign In to Save'}
              </button>
            </div>
          </div>

          {/* Share URL */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Share this comparison:{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {typeof window !== 'undefined' ? window.location.href : ''}
              </code>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>}>
      <ComparePageInner />
    </Suspense>
  );
}
