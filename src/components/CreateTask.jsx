import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';


const CreateTask = ({ tasks, setTasks }) => {

    const [task, setTask] = useState ({
        id: "",
        name:"",
        status: "todo"
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(task.name.length < 3) 
            return toast.error("Las tareas deben tener menos de 3 letras...");
        
        if(task.name.length > 100) 
            return toast.error("Las tareas deben tener más de 100 letras...");


        setTasks((prev) => {
            const list = [...prev, task];

            localStorage.setItem("tasks", JSON.stringify(list))

            return list;

        });

        toast.success("Nueva Tarea Pendiente")

        setTask({
            id: "",
            name:"",
            status: "todo",
        })
    }

  return (
    <form onSubmit={handleSubmit}>
        <input 
        type='text' 
        className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1'
        value={task.name}
        onChange={(e)=> setTask({...task, id: uuidv4(), name: e.target.value})}
        />
        <button className="bg-cyan-600 rounded-md px-4 h-12 text-white">Tarea +</button>
    </form>
  )
}

export default CreateTask;