// src/pages/Auth.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { USERS } from "../users";
import "./Auth.css";

export default function Auth() {
  /* ---------- state ---------- */
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* ---------- refs ---------- */
  const pathRef = useRef(null); // the SVG curve we’ll animate

  /* ---------- handlers ---------- */
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = USERS.find(
      (u) => u.username === form.username && u.password === form.password
    );
    if (!found) return setError("Invalid credentials");
    navigate(found.role === "developer" ? "/developer" : "/manager");
  }

  /* ---------- tiny helper ---------- */
  function nudgeCurve(offset, dash) {
    if (!pathRef.current) return;
    // use attributes so unit-less numbers work in all browsers
    pathRef.current.setAttribute("stroke-dashoffset", offset);
    pathRef.current.setAttribute("stroke-dasharray", dash);
  }

  return (
    <div className="page">
      <div className="container">
        {/* ---------- Left pane ---------- */}
        <div className="left">
          <div className="login" style={{ color: "#333333" }}>Login</div>
          <div className="eula">
            By logging in you agree to the ridiculously long terms that you
            didn’t bother to read.
          </div>
        </div>

        {/* ---------- Right pane ---------- */}
        <div className="right">
          <svg viewBox="0 0 320 300" aria-hidden="true">
            <defs>
              <linearGradient id="linearGradient" x1="13" y1="193.5" x2="307" y2="193.5">
                <stop stopColor="#ff00ff" offset="0" />
                <stop stopColor="#ff0000" offset="1" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="m 40,120 240,0c0,0 25,1 25,35s-25,35-25,35H40c0,0-25,4-25,39s25,39,25,39h215
                 c0,0 20-1 20-25s-20-25-20-25H85c0,0-20,2-20,25s20,25,20,25h169"
              fill="none"
              stroke="url(#linearGradient)"
              strokeWidth="4"
              strokeDasharray="240 1386"
              strokeDashoffset="0"
            />
          </svg>

          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              onFocus={() => nudgeCurve(0, "240 1386")}
              autoComplete="username"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => nudgeCurve(-336, "240 1386")}
              autoComplete="current-password"
              required
            />

            <input
              id="submit"
              type="submit"
              value="Submit"
              onFocus={() => nudgeCurve(-730, "530 1386")}
            />

            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
