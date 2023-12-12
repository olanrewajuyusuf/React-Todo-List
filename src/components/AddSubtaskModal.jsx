import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

const AddSubTaskModal = ({ data, setData }) => {
    const [title, setTitle] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedTasks = data.map(item => {
      if (item.id === id) {
        const subTasks = item.subTasks ? [...item.subTasks, { title, id: crypto.randomUUID(), completed: false }] : [{ title, id: crypto.randomUUID(), completed: false }];
        return { ...item, subTasks };
      }
      return item;
    });

    const updatedItem = updatedTasks.find(item => item.id === id)
  
    fetch(`http://localhost:8000/todoData/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem)
    })
      .then(() => {
        console.log("SubTask Added!");
        setData(updatedTasks);
      })
      .catch(error => {
        console.error("Error sending data:", error);
      });
  
    setTitle('');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="modal">
        <h3>Add SubTask to id no:</h3>
        <h4>{id}</h4>
        <input type="text" value={title} id={id} onChange={(e) => setTitle(e.target.value)} />
        <button>Add Subtask</button>
    </form>
  )
}

export default AddSubTaskModal;