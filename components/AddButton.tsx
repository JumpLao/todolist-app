'use client';

import { Plus } from 'lucide-react';

interface AddButtonProps {
  onClick: () => void;
  disabled: boolean;
}

/**
 * AddButton - Primary action button for adding tasks
 * Disabled when input is empty or storage is unavailable
 */
export function AddButton({ onClick, disabled }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label="Add task"
      className="min-h-[44px] min-w-[44px] px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
    >
      <Plus className="w-5 h-5" />
      <span className="hidden sm:inline">Add</span>
    </button>
  );
}
