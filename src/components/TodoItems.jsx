import { useState } from "react";
import UnMarkedTodo from "./UnMarkedTodo";
import MarkedTodo from "./MarkedTodo";

const TodoItems = ({data, handleTaskUpdate,  handleTaskDelete, handleDrag}) => {
  const [showSubtasks, setShowSubtasks] = useState({});
  const [arrowRotation, setArrowRotation] = useState({});

  const getSpecificDay = (dateString) => {
    const currentDate = new Date();
    const specificDate = new Date(dateString);

    if (
      currentDate.getFullYear() === specificDate.getFullYear() &&
      currentDate.getMonth() === specificDate.getMonth() &&
      currentDate.getDate() === specificDate.getDate()
    ) {
      return 'Today';
    } else {
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);

      if (
          yesterday.getFullYear() === specificDate.getFullYear() &&
          yesterday.getMonth() === specificDate.getMonth() &&
          yesterday.getDate() === specificDate.getDate()
      ) {
          return 'Yesterday';
      } else {
          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          return daysOfWeek[specificDate.getDay()];
      }
    }
}

// Example usage
const todayOrSpecificDay = getSpecificDay('2023-12-14');
console.log(`On 2023-01-01, it is ${todayOrSpecificDay}`);


  // <====== SHOW SUBTASKS FUNCTION HANDLER ======>
  const handleShowSubtasks = (taskId) => {
    setShowSubtasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));

    setArrowRotation((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  }

  let taskUnmarked = [];
  let taskMarked = [];
  let subtaskLength = 0;
  if (data) {
    taskUnmarked = data.filter(task => !task.completed);
    taskMarked = data.filter(task => task.completed);

    const subTask = taskUnmarked.filter(task => task.subTasks).map(ele => ele.subTasks.length)
    
    for(let i = 0; i < subTask.length; i++){
      subtaskLength += subTask[i]
    }
  }

  return (
    <>
      {/* =====UNMARKED TASKS SECTION===== */}
      <p>Tasks - {taskUnmarked.length + subtaskLength} </p>
      <UnMarkedTodo 
        data={data}
        handleTaskUpdate={handleTaskUpdate}
        handleTaskDelete={handleTaskDelete}
        handleShowSubtasks={handleShowSubtasks}
        arrowRotation={arrowRotation}
        showSubtasks={showSubtasks}
        handleDrag={handleDrag}
        taskUnmarked={taskUnmarked}
        getSpecificDay={getSpecificDay}
      />

      {/* =====COMPLETED TASKS SECTION===== */}
      <p>Completed - {taskMarked.length} </p>
      <MarkedTodo
        data={data}
        handleTaskUpdate={handleTaskUpdate}
        handleTaskDelete={handleTaskDelete}
        handleShowSubtasks={handleShowSubtasks}
        arrowRotation={arrowRotation}
        showSubtasks={showSubtasks}
        handleDrag={handleDrag}
        taskMarked={taskMarked}
        getSpecificDay={getSpecificDay}
      />
    </>
  )
}

export default TodoItems