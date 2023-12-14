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
                return { ...item, title: value };
            }

            // Check if the task has subtasks and update them accordingly
            if (item.subTasks) {
                const updatedSubTasks = item.subTasks.map(subTask => {
                    if (subTask.id === id) {
                        return { ...subTask, title: value };
                    }
                    return subTask;
                });
                return { ...item, subTasks: updatedSubTasks };
            }

            return item;
        });
    
        const updatedSubtask = updatedTasks.find(item => {
            if (item.subTasks) {
                return item.subTasks.find(task => task.id === id);
            }
            return item.id === id;
        })

        const updatedTask = updatedTasks.find(item => item.id === id);
      
        let taskID = updatedSubtask ? updatedSubtask.id : id;

        fetch("http://localhost:8000/todoData/" + taskID, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(taskID === id ? updatedTask : updatedSubtask)
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