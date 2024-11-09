import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/db';


export async function POST(req: NextRequest) {
  try {
    const { id, title, description, completed } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
    }

    // Update the task in the database
    db.prepare(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?'
    ).run(title, description, completed, id);

    const updatedTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ message: 'Error updating task', error }, { status: 500 });
  }
}
