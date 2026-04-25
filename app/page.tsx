'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/use-tasks';
import { ErrorBanner } from '@/components/ErrorBanner';
import { TaskInput } from '@/components/TaskInput';
import { AddButton } from '@/components/AddButton';
import { TaskList } from '@/components/TaskList';

/**
 * TodoList App - Main Page
 * A simple, fast todo app with localStorage persistence
 */
export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask, isLoading, error, clearError } = useTasks();
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (inputText.trim()) {
      addTask(inputText);
      setInputText('');
    }
  };

  const isStorageUnavailable = !!error && error.includes('not available');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            TodoList
          </h1>
          <p className="text-gray-600">
            Simple, fast task tracking — your data stays on your device
          </p>
        </header>

        {/* Error Banner */}
        <ErrorBanner message={error} onDismiss={clearError} />

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex gap-3">
          <TaskInput
            value={inputText}
            onChange={setInputText}
            onSubmit={handleSubmit}
            disabled={isStorageUnavailable}
          />
          <AddButton
            onClick={handleSubmit}
            disabled={!inputText.trim() || isStorageUnavailable}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8 text-gray-500">
            Loading your tasks...
          </div>
        )}

        {/* Task List */}
        {!isLoading && <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Data stored locally in your browser. No cloud sync.</p>
        </footer>
      </div>
    </div>
  );
}
