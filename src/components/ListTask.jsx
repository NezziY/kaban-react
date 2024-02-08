import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

const ListTask = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    setTodos(tasks.filter((task) => task.status === "todo"));
    setInProgress(tasks.filter((task) => task.status === "inprogress"));
    setClosed(tasks.filter((task) => task.status === "closed"));
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:mx-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

export default ListTask;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Estudio";
  let bg = "bg-cyan-400";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "Trabajos";
    bg = "bg-rose-400";
    tasksToMap = inProgress;
  }

  if (status === "closed") {
    text = "Pagos";
    bg = "bg-amber-400";
    tasksToMap = closed;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      toast("Nuevo Status de la Tarea", { icon: "😎" });

      return updatedTasks;
    });
  };

  return (
    <div
      ref={drop}
      className={`rounded-md p-2 ${isOver ? "bg-neutral-400" : "bg-neutral-300"}`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center justify-between h-12 px-4 rounded-md uppercase text-sm font-semibold`}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex  justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log(isDragging);

  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => {
      return t.id !== id;
    });

    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);

    toast("Tarea Borrada", { icon: "👻" });
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-4 bg-white rounded-md shadow-md ${
        isDragging ? "opacity-25" : "opacity-100"
      } cursor-grab`}
    >
      <p>{task.name}</p>
      <button
        className="absolute bottom-1 right-1 text-neutral-400"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};
