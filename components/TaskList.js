'use client';
// components/TaskList.js
import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('/api/getAllTasks');
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (task) => {
    await fetch('/api/createTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    await fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`/api/deleteTask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await fetchTasks();
  };

  const updateTask = async (id, updatedTask) => {
    await fetch(`/api/updateTask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updatedTask, id }),
    });
    await fetchTasks();
  };


  const updateTaskToComplete = async (id) => {
    await fetch(`/api/updateTaskToComplete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await fetchTasks();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Task List</h1>
      <TaskForm onSubmit={addTask} />
      <ul className="space-y-4 mt-6">
      {editingTask && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Edit Task</h3>
          <TaskForm
            task={editingTask}
            onSubmit={(updatedTask) => {
              updateTask(editingTask.id, updatedTask);
              setEditingTask(null);
            }}
          />
          <button
            onClick={() => setEditingTask(null)}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      )}
        {tasks.map((task) =>
          task.completed !== 1 && (
            <li
              key={task.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingTask(task)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => updateTaskToComplete(task.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Completed
                </button>
              </div>
            </li>
          ))}

      </ul>



      <ul className="space-y-4 mt-6">
        {tasks.map((task) =>
          task.completed && (
            <li
              key={task.id}
              className="bg-green-100 rounded-lg shadow p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
      
    </div>
  );
}
