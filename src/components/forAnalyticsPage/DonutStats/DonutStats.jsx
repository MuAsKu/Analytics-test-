import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
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
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [70, 30],
            backgroundColor: items.map((item) => item.color),
            borderWidth: 0,
            borderRadius: 0,
            spacing: 0,
            cutout: "55%",
            borderAlign: "center",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        cutout: "70%",
        radius: "90%",
        rotation: -180,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [items]);

  return (
    <div className="donut-card">
      <div className="donut-chart">
        <canvas ref={chartRef} width="160" height="160" />
      </div>

      <div className="donut-title">{title}</div>

      <div className="donut-legend">
        {items.map((item) => (
          <div key={item.label} className="donut-row">
            <div className="donut-label">
              <span className="donutDot" style={{ background: item.color }} />
              {item.label}
            </div>
            <div className="donut-values">
              <span>{item.value}</span>
              <strong>{item.percent}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
