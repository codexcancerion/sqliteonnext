
import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import db from '@/database/db';

export async function GET(req: NextRequest) {
  try {
    // Retrieve all tasks from the database
    const tasks = db.prepare('SELECT * FROM tasks').all();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    return NextResponse.json({ message: 'Error retrieving tasks', error }, { status: 500 });
  }
}