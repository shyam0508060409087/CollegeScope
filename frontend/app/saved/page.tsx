'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CollegeCard from '@/components/CollegeCard';
import { Heart, Scale, Loader2, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface College { id: string; name: string; slug: string; city: string; state: string; type: string; fees: number; rating: number; placementRate: number; avgPackage: number; image?: string | null; }
interface SavedCollege { id: string; collegeId: string; college: College; }
interface SavedComparison { id: string; name: string | null; collegeIds: string[]; createdAt: string; }

export default function SavedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [colleges, setColleges] = useState<SavedCollege[]>([]);
  const [comparisons, setComparisons] = useState<SavedComparison[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const token = (session as any)?.user?.accessToken;
      fetch(`${apiUrl}/api/saved`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setColleges(data.savedColleges || []);
          setComparisons(data.savedComparisons || []);
        })
        .catch(() => toast.error('Failed to load saved items'))
        .finally(() => setLoading(false));
    }
  }, [status, router, session]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Saved Colleges */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 p-2 rounded-xl">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Saved Colleges</h2>
            <p className="text-sm text-gray-500">Your favorite colleges ({colleges.length})</p>
          </div>
        </div>

        {colleges.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">You haven&apos;t saved any colleges yet.</p>
            <Link href="/colleges" className="text-blue-600 hover:underline font-medium">Browse colleges</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {colleges.map((saved) => (
              <CollegeCard key={saved.id} college={saved.college} />
            ))}
          </div>
        )}
      </section>

      {/* Saved Comparisons */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-xl">
            <Scale className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Saved Comparisons</h2>
            <p className="text-sm text-gray-500">Your saved side-by-side analyses ({comparisons.length})</p>
          </div>
        </div>

        {comparisons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Scale className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">You haven&apos;t saved any comparisons yet.</p>
            <Link href="/compare" className="text-blue-600 hover:underline font-medium">Compare colleges</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {comparisons.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">
                    {c.name || 'Unnamed Comparison'}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {c.collegeIds.length} Colleges Compared
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/compare?ids=${c.collegeIds.join(',')}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" /> View Comparison
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
