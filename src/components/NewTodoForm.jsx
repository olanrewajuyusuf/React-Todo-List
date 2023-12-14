import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import useFetch from "../hooks/useFetch";

const NewTodoForm = () => {
  const [title, setTitle] = useState("");
  const { setData } = useFetch('http://localhost:8000/todoData');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, "id": crypto.randomUUID(), "completed": false, "set_day": new Date() };
  
    try {
      await fetch("http://localhost:8000/todoData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
  
      console.log("Task Added!");
  
      setData((prevItems) => {
        return [...prevItems, newTask]
      });
      setTitle('');
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <IoIosAdd className="add"/>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          name="task"
          placeholder="Add a task"
        />
      </div>
    </form>
  )
}

export default NewTodoForm;