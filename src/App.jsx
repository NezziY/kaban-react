import { useEffect } from 'react';
import { useState } from 'react';
import CreateTask from './components/CreateTask';
import ListTask from './components/ListTask';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SetDate from './components/SetDate';

function App() {
  const [tasks, setTasks] = useState([]);

  console.log("tasks", tasks)

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      
      <div className='bg-neutral-400 flex justify-around items-end h-32 py-8'>
        <SetDate />
        <CreateTask tasks={tasks} setTasks={setTasks} />
      </div>

      <div className='bg-neutral-200 w-screen h-screen flex flex-col items-center gap-16 pt-16'>
        
        <ListTask tasks={tasks} setTasks={setTasks}/>
      </div>
    </DndProvider>
  );
}


export default App;

