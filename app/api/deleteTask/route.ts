import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import db from '@/database/db';


export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    // Delete the task from the database
    const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);

    if (result.changes === 0) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ message: 'Error deleting task', error }, { status: 500 });
  }
}