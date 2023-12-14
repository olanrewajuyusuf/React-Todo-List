import useFetch from "../hooks/useFetch";
import TodoItems from "./TodoItems";
import NewTodoForm from './NewTodoForm';
import { useState, useEffect } from "react";
import ReorderList from "./ReorderList";

const TodoList = () => {
    const { data, loading, error, setData } = useFetch('http://localhost:8000/todoData');
    const [reorder, setReorder] = useState(() => {
        const localValue = localStorage.getItem("ITEMS")
        if (localValue == null) return []
  
        return JSON.parse(localValue)
    })

    // <====== REORDER LIST USING LOCALSTORAGE FUNCTION ======>
    useEffect(() => {
      localStorage.setItem("ITEMS", JSON.stringify(reorder))
    }, [reorder])

    useEffect(() => {
        const storedData = localStorage.getItem("ITEM");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setReorder(parsedData);
        }
    }, []);
    
    const deleteReorderList = (index) => {
        const updatedList = [...reorder];
        updatedList.splice(index, 1);
        setReorder(updatedList);

        localStorage.setItem("yourKey", JSON.stringify(updatedList));
    };

      // <====== UPDATE TASKS FUNCTION ======>
    const handleTaskUpdate = (id) => {
        const updatedTasks = data.map(item => {
            if (item.id === id) {
                return {...item, completed: !item.completed}
            }
            if (item.subTasks) {
                const updatedSubTasks = item.subTasks.map(subTask => {
                    if (subTask.id === id) {
                        return { ...subTask, completed: !subTask.completed };
                    }
                    return subTask;
                });
                return { ...item, subTasks: updatedSubTasks };
            }
            return item;
        })

        const updatedSubtask = updatedTasks.find(item => {
            if (item.subTasks) {
                return item.subTasks.find(task => task.id === id);
            }
            return item.id === id;
        })

        const updatedTask = updatedTasks.find(item => item.id === id);
    
        let taskID = updatedSubtask ? updatedSubtask.id : id;
        fetch("http://localhost:8000/todoData/" + taskID, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(taskID === id ? updatedTask : updatedSubtask)
        }).then(()=>{
            console.log("Item Updated");
            setData(updatedTasks);
        }).catch(error => {
            console.error("Error updating item:", error);
        });
    }

    // <====== DELETE TASKS FUNCTION ======>
    const handleTaskDelete = (id) => {
        fetch("http://localhost:8000/todoData/" + id, {
            method: "DELETE"
        }).then(()=>{
            setData(prevTask => prevTask.filter(task => task.id !== id));
        }).catch(error => {
            console.error("Error deleting item:", error);
        });
    }

    // <====== DRAG AND DROP FUNCTION =====>
    const handleDrag = (e, dataType) => {
        e.dataTransfer.setData('dataType', dataType);
    }
    
    const handleDrop = (e) => {
        const dataType = e.dataTransfer.getData('dataType');
        console.log("Data", dataType);
        setReorder([...reorder, dataType]);
    }
    
    const handleDragOver = (e) => {
        e.preventDefault();
    }
    
    return (
        <>
        <NewTodoForm />
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>{ error }</div>}
            <TodoItems 
                data={data}
                handleTaskDelete={handleTaskDelete} 
                handleTaskUpdate={handleTaskUpdate}
                handleDrag={handleDrag}
            />
            <ReorderList handleDrop={handleDrop} handleDragOver={handleDragOver} reorder={reorder} deleteReorderList={deleteReorderList} />
        </div>
        </>
        
    )
}

export default TodoList