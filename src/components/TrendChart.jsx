// src/components/TrendChart.jsx
import { useSelector } from "react-redux";
import { selectConcurrentTrend } from "../features/tasks/tasksSlice";
import "./TrendChart.css";          // ← new CSS import

export default function TrendChart() {
  // shape: { '2025-06-11': 3, '2025-06-12': 5, … }
  const trendObj = useSelector(selectConcurrentTrend);

  // sort by date
  const rows = Object.entries(trendObj).sort(
    ([d1], [d2]) => new Date(d1) - new Date(d2)
  );

  if (!rows.length) return null;

  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">Concurrent tasks per day</h3>

      <table className="trend-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Tasks</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(([date, count]) => (
            <tr key={date}>
              <td data-label="Date">{date}</td>
              <td data-label="Tasks">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
