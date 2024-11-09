'use client';
import { useState } from 'react';

export default function TaskForm({ onSubmit, task = {} }) {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        rows="4"
      ></textarea>
      <button
        type="submit"
        className="bg-indigo-500 text-white rounded-md py-2 mt-2 hover:bg-indigo-600 transition-colors"
      >
        Save Task
      </button>
    </form>
  );
}
