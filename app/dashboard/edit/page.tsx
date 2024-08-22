"use client";

import React, { useState } from 'react';

export default function EditTodoForm() {
  const [titleInput, setTitleInput] = useState(''); // Input field for title
  const [todo, setTodo] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchTodo = async (title) => {
    try {
      const res = await fetch(`/api/todos?title=${encodeURIComponent(title)}`);
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
  };

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    if (titleInput) {
      fetchTodo(titleInput);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/todo/${titleInput}/update`, {
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

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleTitleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="titleInput" className="block text-sm font-medium text-gray-700">Enter Todo Title</label>
          <input
            type="text"
            id="titleInput"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">Fetch Todo</button>
      </form>

      {todo && (
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
      )}

      {success && <p className="text-green-500 mt-4">Todo updated successfully!</p>}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
}
