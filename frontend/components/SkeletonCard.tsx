export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-1.5 bg-gray-200" />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded-lg w-3/4 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
          <div className="h-6 w-16 bg-gray-100 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-50 rounded-xl p-3 h-16" />
          <div className="bg-gray-50 rounded-xl p-3 h-16" />
        </div>
        <div className="flex justify-between mt-4 pt-3 border-t border-gray-50">
          <div className="h-8 bg-gray-100 rounded w-24" />
          <div className="h-8 bg-gray-100 rounded w-20" />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
          <div className="w-10 h-10 bg-gray-100 rounded-xl" />
          <div className="w-10 h-10 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
