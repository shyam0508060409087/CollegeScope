'use client';

import { useCompareStore } from '@/lib/compare-store';
import { X, ArrowRight, Scale } from 'lucide-react';
import Link from 'next/link';

export default function CompareBar() {
  const { colleges, removeCollege, clearAll } = useCompareStore();

  if (colleges.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 border border-gray-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Scale className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Compare ({colleges.length}/3)
                </p>
                <p className="text-xs text-gray-500">Select up to 3 colleges</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-1 justify-center">
              {colleges.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 max-w-[180px]"
                >
                  <span className="text-xs font-medium text-blue-700 truncate">{c.name}</span>
                  <button
                    onClick={() => removeCollege(c.id)}
                    className="p-0.5 text-blue-400 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearAll}
                className="px-3 py-2 text-xs font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear All
              </button>
              {colleges.length >= 2 && (
                <Link
                  href={`/compare?ids=${colleges.map(c => c.id).join(',')}`}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Compare Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
