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

    const handleTaskUpdate = (id) => {
        const updatedTasks = data.map(item => {
            if (item.id === id) {
                return {...item, completed: !item.completed}
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
    }

    const handleTaskDelete = (id) => {
        fetch("http://localhost:8000/todoData/" + id, {
            method: "DELETE"
        }).then(()=>{
            setData((prevItems) => prevItems.filter(item => item.id !== id));
        }).catch(error => {
            console.error("Error deleting item:", error);
        });
    }

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