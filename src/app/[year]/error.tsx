'use client';

import ErrorMessage from '@/components/ui/ErrorMessage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ErrorMessage title="Failed to load season" message={error.message} />
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-ipl-blue text-white rounded-lg hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
