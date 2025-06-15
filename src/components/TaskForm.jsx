// src/components/TaskForm.jsx
import { useState }    from "react";
import { useDispatch } from "react-redux";
import { createTask }  from "../features/tasks/tasksSlice";
import "./TaskForm.css";            // ← new stylesheet

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [desc,  setDesc]  = useState("");
  const [prio,  setPrio]  = useState("low");
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      createTask({
        title,
        description: desc,
        priority: prio,
        assignee: "u-1",
      })
    );

    setTitle(""); 
    setDesc("");  
    setPrio("low");
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <div className="row">
        <input
          className="title-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="prio-select"
          value={prio}
          onChange={(e) => setPrio(e.target.value)}
        >
          <option value="low">low</option>
          <option value="med">med</option>
          <option value="high">high</option>
        </select>

        <button className="btn green" type="submit">
          Create
        </button>
      </div>

      <textarea
        className="desc-area"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
    </form>
  );
}
