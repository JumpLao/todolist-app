'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/lib/types';
import { taskStorage } from '@/lib/storage';

export interface UseTasksReturn {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

/**
 * useTasks - Custom hook for managing task state and storage
 * Provides optimistic UI updates and error handling
 */
export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const loadedTasks = taskStorage.loadTasks();
      setTasks(loadedTasks);

      // Check if storage is available
      if (!taskStorage.isAvailable()) {
        setError('Local storage is not available. Please enable it in your browser settings.');
      }
    } catch (e) {
      setError('Failed to load tasks. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isLoading) return; // Don't save on initial load

    const result = taskStorage.saveTasks(tasks);
    if (!result.success) {
      setError(result.error || 'Failed to save tasks.');
    }
  }, [tasks, isLoading]);

  // Add a new task
  const addTask = useCallback((text: string) => {
    // Validate input
    const validationError = taskStorage.validateTaskText(text);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Clear any previous errors
    setError(null);

    // Create new task
    const newTask = taskStorage.createTask(text);

    // Optimistic update - add to state first
    setTasks((prev) => [...prev, newTask]);
  }, []);

  // Toggle task completion status
  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    setError(null);
  }, []);

  // Delete a task
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setError(null);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    isLoading,
    error,
    clearError,
  };
}
