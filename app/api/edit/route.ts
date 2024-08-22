import { NextResponse } from 'next/server';
import Todo from '@/models/todo'; 
import connectDB from '@/lib/connectMongoDB'; 

export async function GET(request, { params }) {
  const { title } = params;

  try {
    await connectMongoDB(); // Connect to MongoDB
    const todo = await Todo.findOne({ title });
    if (!todo) {
      return NextResponse.json({ success: false, message: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, todo });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
