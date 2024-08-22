"use client";

import React, { useEffect, useState } from 'react';

export default function EditTodoForm({ title }) {
  const [todo, setTodo] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const res = await fetch(`/api/todo/${title}`);
        const data = await res.json();
        if (data.success) {
          setTodo(data.todo);
          setNewTitle(data.todo.title);
          setDescription(data.todo.description);
          setCompleted(data.todo.completed);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchTodo();
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/todo/${title}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTitle, description, completed }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setError(null);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (!todo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
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
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">Update Todo</button>
      </form>
      
      {success && <p className="text-green-500 mt-4">Todo updated successfully!</p>}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
}
