"use client";

import React, { useState } from 'react';

export default function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTitle('');
        setDescription('');
        setCompleted(false);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="completed" className="text-sm font-medium text-gray-700">Completed</label>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">Add Todo</button>
      </form>
      
      {success && <p className="text-green-500 mt-4">Todo added successfully!</p>}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
}
