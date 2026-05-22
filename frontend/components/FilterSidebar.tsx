'use client';

import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { INDIAN_STATES, COLLEGE_TYPES, COURSE_TYPES } from '@/lib/utils';
import { useState } from 'react';

interface FilterSidebarProps {
  state: string;
  setState: (s: string) => void;
  minFees: string;
  setMinFees: (f: string) => void;
  maxFees: string;
  setMaxFees: (f: string) => void;
  course: string;
  setCourse: (c: string) => void;
  sort: string;
  setSort: (s: string) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  state, setState, minFees, setMinFees, maxFees, setMaxFees,
  course, setCourse, sort, setSort, onReset,
}: FilterSidebarProps) {
  const [open, setOpen] = useState(false);
  const hasFilters = state || minFees || maxFees || course;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {hasFilters && (
          <span className="w-2 h-2 bg-blue-500 rounded-full" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`${open ? 'block' : 'hidden'} lg:block`}>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              Filters
            </h3>
            {hasFilters && (
              <button onClick={onReset} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Sort */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">Sort By</label>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              >
                <option value="rating">Rating (High to Low)</option>
                <option value="fees-low">Fees (Low to High)</option>
                <option value="fees-high">Fees (High to Low)</option>
                <option value="placement">Placement Rate</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">State</label>
            <div className="relative">
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              >
                <option value="">All States</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Fees Range */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">Fees Range (₹/year)</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minFees}
                onChange={(e) => setMinFees(e.target.value)}
                className="w-1/2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxFees}
                onChange={(e) => setMaxFees(e.target.value)}
                className="w-1/2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Course Type */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">Course Type</label>
            <div className="relative">
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              >
                <option value="">All Courses</option>
                {COURSE_TYPES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* College Type chips */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">College Type</label>
            <div className="flex flex-wrap gap-2">
              {COLLEGE_TYPES.map((t) => (
                <button
                  key={t}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
