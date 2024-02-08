import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { MdAdd } from "react-icons/md";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3)
      return toast.error("Las tareas deben tener mas de 3 letras...");

    if (task.name.length > 100)
      return toast.error("Las tareas deben tener menos de 100 letras...");

    setTasks((prev) => {
      const list = [...prev, task];

      localStorage.setItem("tasks", JSON.stringify(list));

      return list;
    });

    toast.success("Nueva Tarea Pendiente");

    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex mx-auto">
      <div class="pt-2 relative mx-auto text-gray-600">
        <input
          type="text"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
          placeholder="Tarea Nueva..."
          value={task.name}
          onChange={(e) =>
            setTask({ ...task, id: uuidv4(), name: e.target.value })
          }
        />
        <button className="absolute right-0 top-0 mt-5 mr-4">
          <MdAdd className="text-gray-600 h-4 w-4 fill-current" size={30} />
        </button>
      </div>
    </form>
  );
};

export default CreateTask;
