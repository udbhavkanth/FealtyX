// src/features/tasks/tasksSlice.js
import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";

/* ---------- state shape ---------- */
const initialState = {
  byId: {},   // { [taskId]: taskObj }
  allIds: []  // [taskId, taskId, …] — preserves insertion order
};

const isoNow = () => new Date().toISOString();

/* ---------- slice ---------- */
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /* create --------------------------------------------------------- */
    createTask: {
      reducer(state, action) {
        const task = action.payload;
        state.byId[task.id] = task;
        state.allIds.push(task.id);
      },
      prepare(draft) {
        return {
          payload: {
            ...draft,
            id: nanoid(),
            status: "open",
            createdAt: isoNow(),
            updatedAt: isoNow(),
            timeEntries: []   // each entry: { startedAt, endedAt, duration }
          }
        };
      }
    },

    /* update --------------------------------------------------------- */
    updateTask(state, action) {
      const { id, changes } = action.payload;
      if (state.byId[id]) {
        state.byId[id] = {
          ...state.byId[id],
          ...changes,
          updatedAt: isoNow()
        };
      }
    },

    /* delete --------------------------------------------------------- */
    deleteTask(state, action) {
      const id = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter(tid => tid !== id);
    },

    /* workflow transition ------------------------------------------- */
    transitionStatus(state, action) {
      const { id, newStatus } = action.payload;
      if (state.byId[id]) {
        const t = state.byId[id];
        t.status = newStatus;
        t.updatedAt = isoNow();
        if (newStatus === "closed") t.closedAt = isoNow();
      }
    },

    /* time logging --------------------------------------------------- */
    logTime(state, action) {
      const { id, startedAt, endedAt } = action.payload;
      const duration = (new Date(endedAt) - new Date(startedAt)) / 1000;
      state.byId[id]?.timeEntries.push({ startedAt, endedAt, duration });
    }
  }
});

export const {
  createTask,
  updateTask,
  deleteTask,
  transitionStatus,
  logTime
} = tasksSlice.actions;

export default tasksSlice.reducer;

/* ---------- selectors --------------------------------------------- */

/* Memoised: returns same array reference until tasks slice actually changes */
export const selectAllTasks = createSelector(
  (state) => state.tasks,
  (tasksState) =>
    tasksState.allIds
      .map((id) => tasksState.byId[id])
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
);

/* Filter by status — also memoised */
export const selectTasksByStatus = (status) =>
  createSelector([selectAllTasks], (arr) =>
    arr.filter((t) => t.status === status)
  );

/* Build { 'YYYY-MM-DD': count } for the trend line */
export const selectConcurrentTrend = createSelector(
  [selectAllTasks],
  (tasks) => {
    const buckets = {};
    tasks.forEach((t) => {
      const start = new Date(t.createdAt);
      const end   = t.closedAt ? new Date(t.closedAt) : new Date();
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().slice(0, 10);
        buckets[key] = (buckets[key] || 0) + 1;
      }
    });
    return buckets;
  }
);
