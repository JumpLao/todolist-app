'use client';

import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

/**
 * Checkbox - Custom checkbox component with proper ARIA
 * Uses button with role="checkbox" for better accessibility
 */
export function Checkbox({ checked, onChange, disabled, 'aria-label': ariaLabel }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onChange();
        }
      }}
      className={`
        flex-shrink-0 w-6 h-6 min-w-[44px] min-h-[44px] sm:w-6 sm:h-6 sm:min-w-6 sm:min-h-6
        rounded border-2 flex items-center justify-center transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${checked
          ? 'bg-blue-600 border-blue-600 text-white'
          : 'border-gray-300 hover:border-gray-400 bg-white'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {checked && <Check className="w-4 h-4" />}
    </button>
  );
}
