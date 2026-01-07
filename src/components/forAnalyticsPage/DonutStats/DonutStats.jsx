import React from "react";
import "./DonutStats.css";

export default function DonutStats() {
  return (
    <div className="donut-grid">
      <DonutCard
        title="Активность карт"
        items={[
          {
            label: "Активных карт",
            value: 122,
            percent: "45.6%",
            color: "#7C6EE6",
          },
          {
            label: "Неактивных карт",
            value: 122,
            percent: "45.6%",
            color: "#C9C4F7",
          },
        ]}
      />

      <DonutCard
        title="Добавленных карт"
        items={[
          {
            label: "Выпущено карт",
            value: 5000,
            percent: "45.6%",
            color: "#7C6EE6",
          },
          {
            label: "Добавили к себе",
            value: 124,
            percent: "45.6%",
            color: "#C9C4F7",
          },
        ]}
      />
    </div>
  );
}

function DonutCard({ title, items }) {
  return (
    <div className="donut-card">
      <div className="donut-chart">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="60"
            stroke={items[0].color || "purple"}
            strokeWidth="30"
            fill="none"
            strokeDasharray="264 377"
            strokeDashoffset="0"
            transform="rotate(90 80 80)"
          />
          <circle
            cx="80"
            cy="80"
            r="60"
            stroke={items[1].color || "gray"}
            strokeWidth="30 "
            fill="none"
            strokeDasharray="113 377"
            strokeDashoffset="-264"
            transform="rotate(90 80 80)"
          />
        </svg>
      </div>

      <div className="donut-title">{title}</div>

      <div className="donut-legend">
        {items.map((i) => (
          <div key={i.label} className="donut-row">
            <div className="donut-label">
              <span className="dot" style={{ background: i.color }} />
              {i.label}
            </div>
            <div className="donut-values">
              <span>{i.value}</span>
              <strong>{i.percent}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
