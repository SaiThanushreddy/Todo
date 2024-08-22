import { NextResponse } from 'next/server';
import Todo from '@/model/todo'; // Adjust the path to your Todo model
import connectDB from '@/lib/db'; // Ensure this file manages your MongoDB connection

export async function GET(request) {
  const url = new URL(request.url); 
  const title = url.searchParams.get('title'); 

  try {
    await connectDB(); // Connect to MongoDB
    const todo = await Todo.findOne({ title });
    if (!todo) {
      return NextResponse.json({ success: false, message: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, todo });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
