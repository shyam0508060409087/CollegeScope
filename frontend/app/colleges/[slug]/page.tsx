'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Star, Calendar, BookOpen, TrendingUp, IndianRupee, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import SaveButton from '@/components/SaveButton';
import { useCompareStore } from '@/lib/compare-store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Course { id: string; name: string; duration: number; fees: number; seats: number; }
interface Review { id: string; rating: number; body: string; author: string; createdAt: string; }
interface RelatedCollege { id: string; name: string; slug: string; city: string; state: string; rating: number; fees: number; type: string; }
interface College {
  id: string; name: string; slug: string; location: string; city: string; state: string; type: string;
  fees: number; rating: number; totalReviews: number; placementRate: number; avgPackage: number;
  topRecruiter: string[]; established: number; affiliatedTo: string; description: string; image?: string;
  courses: Course[]; reviews: Review[]; related: RelatedCollege[];
}

export default function CollegeDetailPage() {
  const params = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { addCollege, isInCompare } = useCompareStore();

  useEffect(() => {
    async function fetchCollege() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/colleges/${params.slug}`);
        if (!res.ok) throw new Error('College not found');
        setCollege(await res.json());
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCollege();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-4" />
        <div className="h-48 bg-gray-200 rounded-2xl mb-8" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="h-24 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">College not found</h2>
        <Link href="/colleges" className="mt-4 inline-block text-blue-600 hover:underline">Browse all colleges</Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'Courses' },
    { id: 'placements', label: 'Placements' },
    { id: 'reviews', label: `Reviews (${college.reviews.length})` },
  ];

  const placementData = [
    { name: 'Placement Rate', value: college.placementRate },
    { name: 'Avg Package (LPA)', value: college.avgPackage },
  ];

  const typeColors: Record<string, string> = {
    Government: 'bg-emerald-50 text-emerald-700',
    Private: 'bg-purple-50 text-purple-700',
    Deemed: 'bg-amber-50 text-amber-700',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/colleges" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Colleges
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Hero */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${typeColors[college.type] || 'bg-gray-100 text-gray-700'}`}>
                  {college.type}
                </span>
                <h1 className="text-3xl font-bold mt-3">{college.name}</h1>
                <div className="flex items-center gap-4 mt-3 text-blue-100">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{college.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Est. {college.established}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                <span className="text-xl font-bold">{college.rating}</span>
                <span className="text-sm text-blue-100">/ 5.0</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <IndianRupee className="w-4 h-4 text-blue-200 mb-1" />
                <p className="text-xl font-bold">{formatCurrency(college.fees)}</p>
                <p className="text-xs text-blue-200">Annual Fees</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <TrendingUp className="w-4 h-4 text-blue-200 mb-1" />
                <p className="text-xl font-bold">{college.placementRate}%</p>
                <p className="text-xs text-blue-200">Placement Rate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <IndianRupee className="w-4 h-4 text-blue-200 mb-1" />
                <p className="text-xl font-bold">₹{college.avgPackage} LPA</p>
                <p className="text-xs text-blue-200">Avg Package</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <BookOpen className="w-4 h-4 text-blue-200 mb-1" />
                <p className="text-xl font-bold">{college.courses.length}</p>
                <p className="text-xs text-blue-200">Courses</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{college.description}</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Affiliated To</h3>
                <p className="text-gray-600">{college.affiliatedTo}</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Top Recruiters</h3>
                <div className="flex flex-wrap gap-2">
                  {college.topRecruiter.map((r) => (
                    <span key={r} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-100">{r}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Course</th>
                    <th className="text-center p-4 text-sm font-medium text-gray-500">Duration</th>
                    <th className="text-center p-4 text-sm font-medium text-gray-500">Annual Fees</th>
                    <th className="text-center p-4 text-sm font-medium text-gray-500">Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {college.courses.map((c) => (
                    <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                      <td className="p-4 font-medium text-gray-800">{c.name}</td>
                      <td className="p-4 text-center text-gray-600">{c.duration} years</td>
                      <td className="p-4 text-center text-gray-600">{formatCurrency(c.fees)}</td>
                      <td className="p-4 text-center text-gray-600">{c.seats}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'placements' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-6">Placement Overview</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={placementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1D4ED8" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Top Recruiters</h3>
                <div className="flex flex-wrap gap-2">
                  {college.topRecruiter.map((r) => (
                    <span key={r} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-100">{r}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {college.reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{r.author[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{r.author}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(r.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">{r.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:w-80">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Actions</h3>
              <SaveButton collegeId={college.id} />
              <button
                onClick={() => addCollege({ id: college.id, name: college.name, slug: college.slug })}
                disabled={isInCompare(college.id)}
                className={`w-full py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isInCompare(college.id)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                {isInCompare(college.id) ? 'Added to Compare' : '+ Add to Compare'}
              </button>
            </div>

            {/* Related */}
            {college.related.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Related Colleges</h3>
                <div className="space-y-3">
                  {college.related.map((r) => (
                    <Link key={r.id} href={`/colleges/${r.slug}`} className="block p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <p className="font-medium text-gray-800 text-sm">{r.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{r.rating}</span>
                        <span>{formatCurrency(r.fees)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
