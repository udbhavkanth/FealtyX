import { Routes, Route, Navigate, Link } from "react-router-dom";
import Auth from "./pages/Auth";                     // ← your unchanged file
import DeveloperDashboard from "./pages/DeveloperDashboard";
import ManagerDashboard   from "./pages/ManagerDashboard";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/"          element={<Navigate to="/login" />} />
        <Route path="/login"     element={<Auth />} />
        <Route path="/developer" element={<DeveloperDashboard />} />
        <Route path="/manager"   element={<ManagerDashboard />} />
        {/* fallback */}
        <Route path="*"          element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}
