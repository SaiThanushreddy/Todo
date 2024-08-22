import { NextResponse } from 'next/server';
import Todo from '@/models/Todo'; 
import connectDB from '@/lib/'; 

export async function PUT(request, { params }) {
  const { title } = params;
  const { newTitle, description, completed } = await request.json();

  try {
    await connectDB();
    const updatedTodo = await Todo.findOneAndUpdate(
      { title },
      { title: newTitle, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return NextResponse.json({ success: false, message: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, todo: updatedTodo });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
