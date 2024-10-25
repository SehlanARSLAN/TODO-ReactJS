import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./form.css";
import FormList from "../FormList/FormList";

function Form() {
  const [task, setTask] = useState({
    currentTask: "",
    taskList: [
      { text: "Yemek Ye", completed: false },
      { text: "Dersini Bitir", completed: false },
      { text: "Sınava Çalış", completed: false },
    ],
  });
  const [filter, setFilter] = useState("all");
  const onChangeInput = (e) => {
    setTask({ ...task, currentTask: e.target.value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (task.currentTask.trim()) {
      setTask({
        currentTask: "",
        taskList: [
          ...task.taskList,
          { text: task.currentTask, completed: false },
        ],
      });
    }
  };
  const onDeleteTask = (index) => {
    const newTaskList = task.taskList.filter((_, i) => i !== index);
    setTask({ ...task, taskList: newTaskList });
  };
  const toggleComplete = (index) => {
    const newTaskList = task.taskList.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTask({ ...task, taskList: newTaskList });
  };
  const markAllComplete = () => {
    const allCompleted = task.taskList.every((item) => item.completed);
    const newTaskList = task.taskList.map((item) => ({
      ...item,
      completed: !allCompleted,
    }));
    setTask({ ...task, taskList: newTaskList });
  };
  const getFilteredTasks = () => {
    if (filter === "active") {
      return task.taskList.filter((item) => !item.completed);
    } else if (filter === "completed") {
      return task.taskList.filter((item) => item.completed);
    }
    return task.taskList;
  };

  return (
    <form onSubmit={onSubmitForm} className="formContainer">
      <h1>TODO</h1>
      <div className="inputWrapper">
        <FaChevronDown className="inputIcon" onClick={markAllComplete}/>
        <input
          name="todo"
          placeholder="What needs to be done?"
          onChange={onChangeInput}
          value={task.currentTask}
        />
      </div>
      <FormList
      taskList={getFilteredTasks()}
        onDelete={onDeleteTask}
        toggleComplete={toggleComplete}
        setFilter={setFilter}
        taskCount={task.taskList.length}
      />
    </form>
  );
}

export default Form;
