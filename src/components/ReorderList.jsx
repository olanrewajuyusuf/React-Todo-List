import { MdDeleteOutline } from "react-icons/md";

const ReorderList = ({reorder, handleDrop, handleDragOver, deleteReorderList}) => {

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="reorder-list">
        <h2 style={{color: 'rgb(0, 153, 255)'}}>Reorder List</h2>
        <p>Drag and drop your task here to reorder...</p>
        <ul>
            {reorder.map((data, index) => (
                <li key={index} style={{color: 'white'}}>
                    <span>{data}</span>
                    <span className="del-btn"><MdDeleteOutline onClick={() => deleteReorderList(index)} /></span>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ReorderList