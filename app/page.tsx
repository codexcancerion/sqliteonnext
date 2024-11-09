import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center p-5">
      <div className="w-full max-w-2xl">
        <TaskList />
      </div>
    </div>
  );
}
