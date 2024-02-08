import { useEffect } from "react";
import { useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTask from "./components/ListTask";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SetDate from "./components/SetDate";

function App() {
  const [tasks, setTasks] = useState([]);

  console.log("tasks", tasks);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Toaster />

        <div className="bg-blue-300 py-4 flex flex-col-reverse md:flex md:flex-row">
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <SetDate />
        </div>

        <div className="bg-neutral-100 h-screen flex flex-col p-8 md:p-16 ">
          <ListTask tasks={tasks} setTasks={setTasks} />
        </div>
      </DndProvider>
    </>
  );
}

export default App;
