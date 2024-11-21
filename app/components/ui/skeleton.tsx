export function NFTCardSkeleton() {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
        <div className="relative h-48 bg-gray-300 dark:bg-gray-700" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-24" />
          </div>
        </div>
      </div>
    );
  }