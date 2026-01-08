import React, { useRef, useEffect } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip as ChartTooltip,
  Legend,
  Title,
} from "chart.js";
import "./AnalyticsCards.css";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ChartTooltip,
  Legend,
  Title
);

export default function AnalyticsCards() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current;

    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const dataLight = days.map(() => Math.floor(Math.random() * 40) + 40);
    const dataDark = days.map(() => Math.floor(Math.random() * 30) + 30);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: days.map((d) => d.toString()),
        datasets: [
          {
            label: "Накопленные",
            data: dataLight,
            backgroundColor: "#e9e7ff",
            borderColor: "#e9e7ff",
            borderWidth: 0,
            borderRadius: 3,
            barPercentage: 0.3,
            categoryPercentage: 0.8,
          },
          {
            label: "Потраченные",
            data: dataDark,
            backgroundColor: "#6c63ff",
            borderColor: "#6c63ff",
            borderWidth: 0,
            borderRadius: 3,
            barPercentage: 0.3,
            categoryPercentage: 0.8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: "#9a9a9a",
              font: {
                size: 12,
              },
              crossAlign: "far",
              labelOffset: 4,
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              callback: function (val) {
                return this.getLabelForValue(val);
              },
            },
            afterFit: function (scale) {
              scale.height = 30;
            },
          },
          y: {
            beginAtZero: true,
            max: 100,
            border: {
              display: false,
            },
            grid: {
              color: "#efefef",
            },
            ticks: {
              color: "#9a9a9a",
              font: {
                size: 12,
              },
              stepSize: 20,
              callback: function (value) {
                return value;
              },
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        layout: {
          padding: {
            bottom: 25,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="analytics-wrapper">
      <div className="analytics-card">
        <div className="header-row">
          <div className="stat">
            <div className="stat-title">Среднее количество накопленных</div>
            <div className="stat-value">234 567</div>
            <div className="stat-subtitle">показано за месяц</div>
          </div>

          <div className="stat">
            <div className="stat-title">Среднее количество потраченных</div>
            <div className="stat-value">654 578</div>
            <div className="stat-subtitle">показано за месяц</div>
          </div>
        </div>

        <div className="chart-wrapper">
          <div className="chart">
            <div
              style={{
                position: "relative",
                height: "230px",
                width: "100%",
              }}
            >
              <canvas ref={chartRef} id="analytics-chart" />
            </div>

            <div className="tooltip">
              <div className="tooltip-title">Бонусы</div>
              <div className="tooltip-row">
                <span className="dot dot-light" />
                85 (накопленные)
              </div>
              <div className="tooltip-row">
                <span className="dot dot-dark" />
                55 (потраченные)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
