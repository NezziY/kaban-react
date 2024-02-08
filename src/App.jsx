import { useEffect } from "react";
import { useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTask from "./components/ListTask";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SetDate from "./components/SetDate";
import { WeatherApp } from "./components/WeatherApp";

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

        <div className="bg-blue-300 py-4 flex flex-col-reverse md:justify-around md:flex md:flex-row text-center items-center">
          <div>
           
            <CreateTask tasks={tasks} setTasks={setTasks} />
            <div className="mt-4">
            <SetDate />
            </div>
           
          </div>
          <div>
            <WeatherApp />
          </div>
          
        </div>

        <div className="bg-neutral-100 h-screen flex flex-col p-8 md:p-16 ">
          <ListTask tasks={tasks} setTasks={setTasks} />
        </div>
      </DndProvider>
    </>
  );
}

export default App;
