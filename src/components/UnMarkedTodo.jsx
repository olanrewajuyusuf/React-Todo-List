import { IoIosAdd, IoIosArrowUp, IoIosCheckmark } from "react-icons/io";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { Link } from "react-router-dom";

const UnMarkedTodo = ({data, handleTaskUpdate, handleTaskDelete, handleShowSubtasks, arrowRotation, showSubtasks, handleDrag}) => {

  let taskUnmarked = [];
  let subTask = '';
  if (data) {
    taskUnmarked = data.filter(task => !task.completed);

    subTask = taskUnmarked.map(task => task.subTasks)
  }

  return (
    <>
    {data && taskUnmarked.map(task => (
        <div key={task.id} draggable onDragStart={(e) => handleDrag(e, task.title)}>
          <article className="task-label">
            <section className={`task ${task.completed ? 'completed' : ''}`}>
              <label htmlFor={task.id}>
                <input
                  type="checkbox"
                  id={task.id}
                  checked={task.completed}
                  onChange={() => handleTaskUpdate(task.id)}
                />
                <div className="check"><IoIosCheckmark className="check-icon"/></div>
                {task.title}
              </label>
              <div className="icons">
                <MdDeleteOutline onClick={() => handleTaskDelete(task.id)} className="delete"/>
                <Link to={`/add/${task.id}`}><IoIosAdd /></Link>
                <Link to={`/edit/${task.id}`}><MdEditNote /></Link>
              </div>

              {task.subTasks && (
              <IoIosArrowUp 
                className="arrow" 
                onClick={() => handleShowSubtasks(task.id)} 
                style={{rotate: arrowRotation[task.id] ? '180deg' : ''}}
              />)}
            </section>
            
            <div className={task.set_deadline && task.set_deadline} style={{fontSize: 12, marginTop: 5}}>
              {task.set_deadline && <span><GoCalendar /> {task.set_deadline}</span>}
            </div>
          </article>

          {/* ======Subtask section====== */}
          {showSubtasks[task.id] && <section className="subtasks">
            {task.subTasks && task.subTasks.map(task => (
              <div key={subTask.id} className={`sub-task ${subTask.completed ? 'completed' : ''}`}>
                <label htmlFor={task.id}>
                  <input
                    type="checkbox"
                    id={task.id}
                    checked={task.completed}
                    onChange={() => handleTaskUpdate(task.id)}
                  />
                  <div className="check"><IoIosCheckmark className="check-icon"/></div>
                  {task.title}
                </label>
                <div className="icons">
                  <MdDeleteOutline onClick={() => handleTaskDelete(task.id)} className="delete"/>
                  <Link to={`/edit/${task.id}`}><MdEditNote /></Link>
                </div>
              </div>
            ))}
           </section>}
        </div>
      ))}</>
  )
}

export default UnMarkedTodo