import { useState } from "react";
import UnMarkedTodo from "./UnMarkedTodo";
import MarkedTodo from "./MarkedTodo";

const TodoItems = ({data, handleTaskUpdate,  handleTaskDelete, handleDrag}) => {
  const [showSubtasks, setShowSubtasks] = useState({});
  const [arrowRotation, setArrowRotation] = useState({});

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
  let subTask = '';
  if (data) {
    taskUnmarked = data.filter(task => !task.completed);
    taskMarked = data.filter(task => task.completed);

    subTask = taskUnmarked.map(task => task.subTasks)
  }

  return (
    <>
      {/* =====UNMARKED TASKS SECTION===== */}
      <p>Tasks - {taskUnmarked.length + subTask.length} </p>
      <UnMarkedTodo 
        data={data}
        handleTaskUpdate={handleTaskUpdate}
        handleTaskDelete={handleTaskDelete}
        handleShowSubtasks={handleShowSubtasks}
        arrowRotation={arrowRotation}
        showSubtasks={showSubtasks}
        handleDrag={handleDrag}
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
      />
    </>
  )
}

export default TodoItems