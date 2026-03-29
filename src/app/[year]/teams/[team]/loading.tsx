import { TableSkeleton } from '@/components/ui/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="h-32 bg-gray-200 rounded-xl mb-6 animate-pulse" />
      <TableSkeleton rows={15} />
    </div>
  );
}
