import { NextResponse } from 'next/server';
import Todo from '@/model/todo';
import connectMongoDB from '@/lib/db'; // Ensure this file manages your MongoDB connection

export async function POST(request) {
  try {
    await connectMongoDB(); // Connect to MongoDB
    const { title, description, completed } = await request.json();
    console.log(title, description, completed)
    
    const newTodo = new Todo({
      title,
      description,
      completed: completed || false,
    });

    await newTodo.save();
    console.log("Updated")
    return NextResponse.json({ success: true, todo: newTodo });
  } catch (error) {
    console.log("error")
    return NextResponse.json({ success: false, message: error.message });
  }
}
