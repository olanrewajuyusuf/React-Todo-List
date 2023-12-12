import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

const EditModal = ({ data, setData }) => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTasks = data.map(item => {
            if (item.id === id) {
                return {...item, title: value}
            }
            return item;
        })
    
        const updatedItem = updatedTasks.find(item => item.id === id)
        fetch("http://localhost:8000/todoData/" + id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedItem)
        }).then(()=>{
            console.log("Item Updated");
            setData(updatedTasks);
        }).catch(error => {
            console.error("Error updating item:", error);
        });

        navigate('/');
    }

  return (
    <form onSubmit={handleSubmit} className="modal">
        <h3>Edit Task with id no:</h3>
        <h4>{id}</h4>
        <input type="text" value={value} id={id} onChange={(e) => setValue(e.target.value)} />
        <button>Edit</button>
    </form>
  )
}

export default EditModal