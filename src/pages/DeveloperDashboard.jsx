import { useEffect }   from "react";
import { useDispatch } from "react-redux";
import { setRole }     from "../features/auth/authSlice";
import TaskForm   from "../components/TaskForm";
import TasksList  from "../components/TasksList";
import TrendChart from "../components/TrendChart";

export default function DeveloperDashboard() {
  const dispatch = useDispatch();
  useEffect(() =>{ dispatch(setRole("developer")); }, [dispatch]);

  return (
    <div>
      <h2>Developer Dashboard</h2>
      <TaskForm />
      <TasksList role="developer" />
      <TrendChart />
    </div>
  );
}
