import { useEffect }   from "react";
import { useDispatch } from "react-redux";
import { setRole }     from "../features/auth/authSlice";
import TasksList  from "../components/TasksList";
import TrendChart from "../components/TrendChart";

export default function ManagerDashboard() {
  const dispatch = useDispatch();
  useEffect(() => {dispatch(setRole("manager")); }, [dispatch]);

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <TasksList role="manager" />
      <TrendChart />
    </div>
  );
}
