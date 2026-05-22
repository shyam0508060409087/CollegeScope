'use client';

import Link from 'next/link';
import { MapPin, Star, TrendingUp, IndianRupee, Plus, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import SaveButton from './SaveButton';
import { useCompareStore } from '@/lib/compare-store';

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
  image?: string | null;
}

export default function CollegeCard({ college }: { college: College }) {
  const { addCollege, removeCollege, isInCompare } = useCompareStore();
  const inCompare = isInCompare(college.id);

  const typeColors: Record<string, string> = {
    Government: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Private: 'bg-purple-50 text-purple-700 border-purple-200',
    Deemed: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <Link href={`/colleges/${college.slug}`}>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 text-[15px] leading-snug">
                {college.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 mt-1.5 text-gray-500">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-xs truncate">{college.city}, {college.state}</span>
            </div>
          </div>
          <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border flex-shrink-0 ${typeColors[college.type] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
            {college.type}
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-amber-50/50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-lg">{college.rating}</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">Rating</p>
          </div>
          <div className="bg-emerald-50/50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="font-bold text-lg">{college.placementRate}%</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">Placed</p>
          </div>
        </div>

        {/* Fees & Package */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Annual Fees</p>
            <div className="flex items-center gap-0.5 text-gray-800">
              <IndianRupee className="w-3.5 h-3.5" />
              <span className="font-semibold text-sm">{formatCurrency(college.fees).replace('₹', '')}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Avg Package</p>
            <p className="font-semibold text-sm text-gray-800">₹{college.avgPackage} LPA</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          <Link
            href={`/colleges/${college.slug}`}
            className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-center hover:-translate-y-0.5"
          >
            View Details
          </Link>
          <button
            onClick={() => inCompare ? removeCollege(college.id) : addCollege({ id: college.id, name: college.name, slug: college.slug })}
            className={`p-2.5 rounded-xl border transition-all duration-200 ${
              inCompare
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50'
            }`}
            title={inCompare ? 'Remove from compare' : 'Add to compare'}
          >
            {inCompare ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
          <SaveButton collegeId={college.id} />
        </div>
      </div>
    </div>
  );
}
