import { Task, STORAGE_KEY, MAX_TASK_LENGTH, StorageResult } from './types';

/**
 * TaskStorageService - Handles all localStorage operations for tasks
 */
class TaskStorageService {
  /**
   * Check if localStorage is available
   */
  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const testKey = '__todolist_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Load all tasks from localStorage
   * Returns empty array if no data exists or if data is corrupted
   */
  loadTasks(): Task[] {
    if (!this.isAvailable()) return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];

      const tasks = JSON.parse(data) as Task[];

      // Validate that it's an array
      if (!Array.isArray(tasks)) return [];

      // Validate each task has required fields
      return tasks.filter(
        (task): task is Task =>
          typeof task === 'object' &&
          task !== null &&
          typeof task.id === 'string' &&
          typeof task.text === 'string' &&
          typeof task.completed === 'boolean' &&
          typeof task.createdAt === 'string'
      );
    } catch (error) {
      // Corrupt data - return empty array for graceful degradation
      console.error('Failed to load tasks from localStorage:', error);
      return [];
    }
  }

  /**
   * Save all tasks to localStorage
   */
  saveTasks(tasks: Task[]): StorageResult {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'Local storage is not available. Please enable it in your browser settings.',
      };
    }

    try {
      const data = JSON.stringify(tasks);
      localStorage.setItem(STORAGE_KEY, data);
      return { success: true };
    } catch (e) {
      // Check if it's a quota exceeded error
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        return {
          success: false,
          error: 'Storage full. Delete some tasks to continue.',
        };
      }

      return {
        success: false,
        error: 'Failed to save tasks. Please try again.',
      };
    }
  }

  /**
   * Get current localStorage usage percentage
   * Returns 0 if unavailable
   */
  getUsagePercent(): number {
    if (!this.isAvailable()) return 0;

    try {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      // Rough estimate: assume 5MB limit (5,000,000 bytes = ~5M chars)
      return Math.min(100, Math.round((total / 5_000_000) * 100));
    } catch {
      return 0;
    }
  }

  /**
   * Validate task text
   */
  validateTaskText(text: string): string | null {
    const trimmed = text.trim();

    if (trimmed.length === 0) {
      return 'Task cannot be empty';
    }

    if (text.length > MAX_TASK_LENGTH) {
      return `Task must be ${MAX_TASK_LENGTH} characters or less`;
    }

    return null; // Valid
  }

  /**
   * Create a new task object
   */
  createTask(text: string): Task {
    return {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
  }
}

// Singleton instance
export const taskStorage = new TaskStorageService();
