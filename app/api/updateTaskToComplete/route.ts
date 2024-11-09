import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import db from '@/database/db';


export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    // Update the task in the database
    db.exec(
      `UPDATE tasks SET completed = 1 WHERE id = ${id}`
    );

    const updatedTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ message: 'Error updating task', error }, { status: 500 });
  }
}
