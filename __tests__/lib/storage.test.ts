/**
 * Unit tests for TaskStorageService
 */

import { taskStorage } from '@/lib/storage';
import { STORAGE_KEY } from '@/lib/types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] || null,
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

describe('TaskStorageService', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('isAvailable', () => {
    it('should return true when localStorage is available', () => {
      expect(taskStorage.isAvailable()).toBe(true);
    });
  });

  describe('loadTasks', () => {
    it('should return empty array when no tasks exist', () => {
      const tasks = taskStorage.loadTasks();
      expect(tasks).toEqual([]);
    });

    it('should load and parse valid tasks', () => {
      const mockTasks = [
        { id: '1', text: 'Test task', completed: false, createdAt: '2024-01-01T00:00:00.000Z' },
      ];
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(mockTasks));

      const tasks = taskStorage.loadTasks();
      expect(tasks).toEqual(mockTasks);
    });

    it('should return empty array for invalid JSON', () => {
      localStorageMock.setItem(STORAGE_KEY, 'invalid json');

      const tasks = taskStorage.loadTasks();
      expect(tasks).toEqual([]);
    });

    it('should filter out invalid task objects', () => {
      const invalidData = [
        { id: '1', text: 'Valid task', completed: false, createdAt: '2024-01-01T00:00:00.000Z' },
        { id: '2', text: 'Invalid task - missing createdAt', completed: false },
        'not an object',
        null,
      ];
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(invalidData));

      const tasks = taskStorage.loadTasks();
      expect(tasks).toHaveLength(1);
      expect(tasks[0].id).toBe('1');
    });
  });

  describe('saveTasks', () => {
    it('should save tasks to localStorage', () => {
      const tasks = [
        { id: '1', text: 'Test task', completed: false, createdAt: '2024-01-01T00:00:00.000Z' },
      ];

      const result = taskStorage.saveTasks(tasks);

      expect(result.success).toBe(true);
      expect(localStorageMock.getItem(STORAGE_KEY)).toBe(JSON.stringify(tasks));
    });

    it('should handle quota exceeded errors', () => {
      // First, verify storage is available
      expect(taskStorage.isAvailable()).toBe(true);

      // Mock quota exceeded error by temporarily overriding setItem
      const originalSetItem = global.localStorage.setItem;
      const setItemMock = jest.fn((key: string, value: string) => {
        // Only throw for the actual storage key, not for the test key
        if (key === STORAGE_KEY) {
          const error: any = new Error('Quota exceeded');
          error.name = 'QuotaExceededError';
          throw error;
        }
        // For other keys (like the test key in isAvailable), work normally
        return originalSetItem.call(global.localStorage, key, value);
      });

      global.localStorage.setItem = setItemMock;

      const tasks = [{ id: '1', text: 'Test', completed: false, createdAt: '2024-01-01T00:00:00.000Z' }];
      const result = taskStorage.saveTasks(tasks);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Storage full');

      global.localStorage.setItem = originalSetItem;
    });
  });

  describe('validateTaskText', () => {
    it('should reject empty text', () => {
      const error = taskStorage.validateTaskText('');
      expect(error).toBe('Task cannot be empty');
    });

    it('should reject whitespace-only text', () => {
      const error = taskStorage.validateTaskText('   ');
      expect(error).toBe('Task cannot be empty');
    });

    it('should reject text exceeding max length', () => {
      const longText = 'a'.repeat(501);
      const error = taskStorage.validateTaskText(longText);
      expect(error).toContain('500 characters or less');
    });

    it('should accept valid text', () => {
      const error = taskStorage.validateTaskText('Valid task text');
      expect(error).toBeNull();
    });
  });

  describe('createTask', () => {
    it('should create a task with valid structure', () => {
      const task = taskStorage.createTask('Test task');

      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('text', 'Test task');
      expect(task).toHaveProperty('completed', false);
      expect(task).toHaveProperty('createdAt');

      // Verify UUID format (basic check)
      expect(task.id).toMatch(/^[0-9a-f-]{36}$/);

      // Verify ISO date format
      expect(new Date(task.createdAt).toISOString()).toBe(task.createdAt);
    });

    it('should trim task text', () => {
      const task = taskStorage.createTask('  Test task with spaces  ');
      expect(task.text).toBe('Test task with spaces');
    });
  });
});
