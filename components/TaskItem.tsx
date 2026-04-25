'use client';

import { Task } from '@/lib/types';
import { Checkbox } from './Checkbox';
import { DeleteButton } from './DeleteButton';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

/**
 * TaskItem - Individual task item with checkbox, text, and delete button
 * Shows strikethrough for completed tasks
 */
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li
      className="group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
    >
      <Checkbox
        checked={task.completed}
        onChange={onToggle}
        aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
      />

      <span
        className={`
          flex-1 text-base break-words
          ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}
        `}
      >
        {task.text}
      </span>

      <DeleteButton
        onClick={onDelete}
        aria-label={`Delete task: ${task.text}`}
      />
    </li>
  );
}
