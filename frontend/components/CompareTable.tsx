'use client';

import { formatCurrency } from '@/lib/utils';
import { X, Star, MapPin, Calendar, GraduationCap, TrendingUp, IndianRupee, Building2 } from 'lucide-react';

interface CollegeData {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  fees: number;
  rating: number;
  placementRate: number;
  avgPackage: number;
  established: number;
  courses: { name: string }[];
}

interface CompareTableProps {
  colleges: CollegeData[];
  onRemove: (id: string) => void;
}

export default function CompareTable({ colleges, onRemove }: CompareTableProps) {
  if (colleges.length === 0) return null;

  const rows = [
    { label: 'Location', icon: MapPin, getValue: (college: CollegeData) => `${college.city}, ${college.state}`, best: null },
    { label: 'Type', icon: Building2, getValue: (college: CollegeData) => college.type, best: null },
    { label: 'Established', icon: Calendar, getValue: (college: CollegeData) => college.established.toString(), best: (vals: number[]) => Math.min(...vals) },
    { label: 'Annual Fees', icon: IndianRupee, getValue: (college: CollegeData) => formatCurrency(college.fees), best: (vals: number[]) => Math.min(...vals), rawValue: (college: CollegeData) => college.fees },
    { label: 'Rating', icon: Star, getValue: (college: CollegeData) => `${college.rating} / 5.0`, best: (vals: number[]) => Math.max(...vals), rawValue: (college: CollegeData) => college.rating },
    { label: 'Placement Rate', icon: TrendingUp, getValue: (college: CollegeData) => `${college.placementRate}%`, best: (vals: number[]) => Math.max(...vals), rawValue: (college: CollegeData) => college.placementRate },
    { label: 'Avg Package', icon: IndianRupee, getValue: (college: CollegeData) => `₹${college.avgPackage} LPA`, best: (vals: number[]) => Math.max(...vals), rawValue: (college: CollegeData) => college.avgPackage },
    { label: 'Courses', icon: GraduationCap, getValue: (college: CollegeData) => college.courses.map(co => co.name).join(', '), best: null },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr>
            <th className="text-left p-4 bg-gray-50 rounded-tl-xl font-medium text-gray-500 text-sm w-40">
              Feature
            </th>
            {colleges.map((college) => (
              <th key={college.id} className="p-4 bg-gray-50 last:rounded-tr-xl min-w-[220px]">
                <div className="flex flex-col items-center gap-2">
                  <h3 className="font-bold text-gray-900 text-sm text-center leading-tight">{college.name}</h3>
                  <button
                    onClick={() => onRemove(college.id)}
                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {rows.map((row, i) => {
            const Icon = row.icon;
            const rawValues = row.rawValue ? colleges.map(college => row.rawValue!(college)) : [];
            const bestVal = row.best ? row.best(rawValues) : null;

            return (
              <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="p-4 font-medium text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-blue-500" />
                    {row.label}
                  </div>
                </td>
                {colleges.map((college) => {
                  const isBest = bestVal !== null && row.rawValue && row.rawValue(college) === bestVal;
                  return (
                    <td
                      key={college.id}
                      className={`p-4 text-center text-sm ${
                        isBest ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {row.getValue(college)}
                      {isBest && <span className="ml-1 text-emerald-500">✓</span>}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
