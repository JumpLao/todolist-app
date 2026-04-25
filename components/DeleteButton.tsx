'use client';

import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  onClick: () => void;
  'aria-label': string;
}

/**
 * DeleteButton - Destructive action button for deleting tasks
 * Uses trash icon from lucide-react
 */
export function DeleteButton({ onClick, 'aria-label': ariaLabel }: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="
        min-h-[44px] min-w-[44px] p-2 text-gray-400 hover:text-red-600
        hover:bg-red-50 rounded transition-colors focus:outline-none
        focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        flex items-center justify-center
      "
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
