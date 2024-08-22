"use client";

import React from 'react';

export default function TodoCard({ title, description, completed }) {
  return (
    <div className={`border rounded-lg p-4 shadow-md ${completed ? 'bg-green-100' : 'bg-red-100'}`}>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <div className="mt-2">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${completed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {completed ? 'Completed' : 'Not Completed'}
        </span>
      </div>
    </div>
  );
}
