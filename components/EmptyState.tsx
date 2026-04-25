'use client';

/**
 * EmptyState - Friendly message shown when no tasks exist
 */
export function EmptyState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="text-center py-12 px-4"
    >
      <div className="text-6xl mb-4">📝</div>
      <p className="text-gray-500 text-lg">No tasks yet. Add one above!</p>
    </div>
  );
}
