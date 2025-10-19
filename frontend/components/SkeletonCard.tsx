export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
        <div className="flex gap-2 mb-3">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-20" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}