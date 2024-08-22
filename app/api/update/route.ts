import { NextResponse } from 'next/server';
import Todo from '@/model/todo'; 
import connectMongoDB from '@/lib/db'; 

export async function PUT(request, { params }) {
  const { title } = params;
  const { newTitle, description, completed } = await request.json();

  try {
    await connectMongoDB();
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
