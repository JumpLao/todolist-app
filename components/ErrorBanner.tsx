'use client';

import { X } from 'lucide-react';

interface ErrorBannerProps {
  message: string | null;
  onDismiss: () => void;
}

/**
 * ErrorBanner - Displays error messages with dismiss button
 * Uses role="alert" for screen reader announcements
 */
export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="w-full max-w-md mx-auto mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
    >
      <div className="flex-1 text-sm text-red-800">
        {message}
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="flex-shrink-0 p-1 hover:bg-red-100 rounded transition-colors"
        type="button"
      >
        <X className="w-4 h-4 text-red-600" />
      </button>
    </div>
  );
}
