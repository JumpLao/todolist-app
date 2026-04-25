/**
 * Task interface representing a single todo item
 */
export interface Task {
  id: string;        // UUID v4, unique identifier
  text: string;      // User-provided task text, max 500 chars
  completed: boolean; // Completion status
  createdAt: string; // ISO 8601 timestamp
}

/**
 * Result type for storage operations
 */
export interface StorageResult {
  success: boolean;
  error?: string;
}

/**
 * Local storage key for tasks
 */
export const STORAGE_KEY = 'todolist_tasks';

/**
 * Maximum task text length
 */
export const MAX_TASK_LENGTH = 500;

/**
 * Minimum task text length
 */
export const MIN_TASK_LENGTH = 1;
