import React from 'react'
import "./formList.css"
import { MdOutlineCancel } from "react-icons/md";

const FormList = ({ taskList, onDelete, toggleComplete, setFilter, taskCount }) => {
  return (
    <div className="taskList">
      {taskList.map((item, index) => (
        <div key={index} className="taskItem">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleComplete(index)}
          />
          <span className={item.completed ? "completed" : ""}>{item.text}</span>
          <div className="cancelButton" onClick={() => onDelete(index)}>
            <MdOutlineCancel />
          </div>
        </div>
      ))}
      <div className="itemListBottom">
        <div className="itemLeft">{taskList.length} Item left</div>
        <div className='itemListButtons'>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
      </div>
    </div>
  );
}

export default FormList;
