// src/components/TaskList.jsx
import { useEffect, useState }           from "react";
import { useSelector, useDispatch }       from "react-redux";
import {
  selectAllTasks,
  deleteTask,
  transitionStatus,
} from "../features/tasks/tasksSlice";
import "./TaskList.css";

/* ─── helpers ─── */
const pad = (n) => String(n).padStart(2, "0");
const fmt  = (ms) => {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${pad(h)}:${pad(m)}:${pad(ss)}`;
};

const timerKey   = (id) => `timer-${id}`;     // running start-time
const elapsedKey = (id) => `elapsed-${id}`;   // finished duration

export default function TasksList({ role }) {
  const tasks = useSelector(selectAllTasks);
  const dispatch = useDispatch();

  /* force a tick each second so live timers update */
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);

  /* start timer */
  const handleStart = (id) => {
    if (!localStorage.getItem(timerKey(id))) {
      localStorage.setItem(timerKey(id), Date.now().toString());
    }
  };

  /* wrap existing Close action so we can capture elapsed time */
  const handleClose = (id) => {
    const started = localStorage.getItem(timerKey(id));
    if (started) {
      const elapsed = Date.now() - Number(started);
      localStorage.removeItem(timerKey(id));
      localStorage.setItem(elapsedKey(id), elapsed.toString());
    }
    dispatch(transitionStatus({ id, newStatus: "pending" }));
  };

  return (
    <div className="wrapper">
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created</th>
            <th>Timer</th>         {/* NEW */}
            <th>Time&nbsp;Taken</th>{/* NEW */}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => {
            /* compute timing values */
            const started   = localStorage.getItem(timerKey(t.id));
            const finished  = localStorage.getItem(elapsedKey(t.id));
            const isRunning = Boolean(started) && !finished;

            let timeTaken = "";
            if (finished) timeTaken = fmt(Number(finished));
            else if (isRunning) timeTaken = fmt(Date.now() - Number(started));

            return (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>{t.createdAt.slice(0, 10)}</td>

                {/* Timer column */}
                <td>
                  {role === "developer" && !started && t.status === "open" && (
                    <button className="btn purple" onClick={() => handleStart(t.id)}>
                      Start
                    </button>
                  )}
                  {isRunning && <span>{fmt(Date.now() - Number(started))}</span>}
                </td>

                {/* Time-taken column */}
                <td>{timeTaken}</td>

                {/* existing actions */}
                <td className="actions-cell">
                  {role === "developer" && t.status === "open" && (
                    <button className="btn blue" onClick={() => handleClose(t.id)}>
                      Close
                    </button>
                  )}

                  {role === "manager" && t.status === "pending" && (
                    <>
                      <button
                        className="btn green"
                        onClick={() =>
                          dispatch(
                            transitionStatus({ id: t.id, newStatus: "closed" })
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="btn orange"
                        onClick={() =>
                          dispatch(
                            transitionStatus({ id: t.id, newStatus: "open" })
                          )
                        }
                      >
                        Re-open
                      </button>
                    </>
                  )}

                  {role === "developer" && (
                    <button
                      className="btn red"
                      onClick={() => dispatch(deleteTask(t.id))}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
