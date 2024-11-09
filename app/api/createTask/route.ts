import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/db';

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();
    if (!title || !description) {
      return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
    }

    // Insert a new task into the database
    const result = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)').run(title, description);

    const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ message: 'Error creating task', error }, { status: 500 });
  }
}