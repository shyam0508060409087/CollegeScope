'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CollegeCard from '@/components/CollegeCard';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import CompareBar from '@/components/CompareBar';
import SkeletonCard from '@/components/SkeletonCard';
import { ChevronLeft, ChevronRight, SearchX } from 'lucide-react';

interface College {
  id: string; name: string; slug: string; city: string; state: string;
  type: string; fees: number; rating: number; placementRate: number;
  avgPackage: number; image?: string | null;
}

interface ApiResponse {
  colleges: College[]; total: number; page: number; totalPages: number;
}

function CollegesPageInner() {
  const searchParams = useSearchParams();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [state, setState] = useState(searchParams.get('state') || '');
  const [minFees, setMinFees] = useState(searchParams.get('minFees') || '');
  const [maxFees, setMaxFees] = useState(searchParams.get('maxFees') || '');
  const [course, setCourse] = useState(searchParams.get('course') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'rating');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (state) params.set('state', state);
      if (minFees) params.set('minFees', minFees);
      if (maxFees) params.set('maxFees', maxFees);
      if (course) params.set('course', course);
      params.set('sort', sort);
      params.set('page', page.toString());
      params.set('limit', '12');

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/colleges?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch colleges');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Fetch error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Failed to load colleges. Please try again.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [search, state, minFees, maxFees, course, sort, page]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const resetFilters = () => {
    setSearch(''); setState(''); setMinFees(''); setMaxFees('');
    setCourse(''); setSort('rating'); setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Colleges</h1>
        <p className="mt-2 text-gray-500">Discover and compare the best colleges across India</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-72 flex-shrink-0">
          <FilterSidebar
            state={state} setState={(v) => { setState(v); setPage(1); }}
            minFees={minFees} setMinFees={(v) => { setMinFees(v); setPage(1); }}
            maxFees={maxFees} setMaxFees={(v) => { setMaxFees(v); setPage(1); }}
            course={course} setCourse={(v) => { setCourse(v); setPage(1); }}
            sort={sort} setSort={(v) => { setSort(v); setPage(1); }}
            onReset={resetFilters}
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Results count */}
          {data && !loading && (
            <p className="text-sm text-gray-500 mb-4">
              Showing {data.colleges.length} of {data.total} colleges
            </p>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">{error}</p>
              <button onClick={fetchColleges} className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                Try Again
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && data?.colleges.length === 0 && (
            <div className="text-center py-20">
              <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No colleges found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search term</p>
              <button onClick={resetFilters} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                Clear Filters
              </button>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && data && data.colleges.length > 0 && (
            <>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.colleges.map((c) => <CollegeCard key={c.id} college={c} />)}
              </div>

              {/* Pagination */}
              {data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === data.totalPages || Math.abs(p - page) <= 1)
                      .map((p, idx, arr) => (
                        <span key={p}>
                          {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-gray-400">...</span>}
                          <button
                            onClick={() => setPage(p)}
                            className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                              p === page ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {p}
                          </button>
                        </span>
                      ))}
                  </div>
                  <button
                    disabled={page >= (data?.totalPages || 1)}
                    onClick={() => setPage(page + 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <CompareBar />
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" /></div>}>
      <CollegesPageInner />
    </Suspense>
  );
}
