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
import "./RetentionOverview.css";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ChartTooltip,
  Legend,
  Title
);

export default function RetentionOverview() {
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
    const dataRetention = days.map(() => Math.floor(Math.random() * 15) + 15);
    const dataChurn = days.map(
      (_, i) => dataRetention[i] - Math.floor(Math.random() * 3)
    );

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: days.map((d) => d.toString()),
        datasets: [
          {
            data: dataRetention,
            backgroundColor: "#6D4EDF",
            borderColor: "#6D4EDF",
            borderRadius: {
              topLeft: 3,
              topRight: 3,
              bottomLeft: 0,
              bottomRight: 0,
            },
            barPercentage: 0.4,
          },
          {
            data: dataChurn,
            backgroundColor: "#947DE8",
            borderColor: "#947DE8",
            borderRadius: {
              topLeft: 3,
              topRight: 3,
              bottomLeft: 0,
              bottomRight: 0,
            },
            barPercentage: 0.4,
          },
          {
            data: dataChurn,
            backgroundColor: "#CABEF3",
            borderColor: "#CABEF3",
            borderRadius: {
              topLeft: 3,
              topRight: 3,
              bottomLeft: 0,
              bottomRight: 0,
            },
            barPercentage: 0.4,
          },
          {
            data: dataChurn,
            backgroundColor: "#EDE9FB",
            borderColor: "#EDE9FB",
            borderRadius: {
              topLeft: 3,
              topRight: 3,
              bottomLeft: 0,
              bottomRight: 0,
            },
            barPercentage: 0.4,
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
              crossAlign: "near",
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
            },
            afterFit: function (scale) {
              scale.height = 30;
            },
            stacked: true,
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
            },
            stacked: true,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        layout: {
          padding: {
            left: 5,
            right: 5,
            bottom: 25,
            top: 5,
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
    <div className="retention-wrapper">
      <div className="retention-card">
        <div className="retention-header">
          <div className="retention-stat">
            <div className="retention-stat-title">Коэффициент удержания</div>
            <div className="retention-stat-value">76%</div>
            <div className="retention-stat-subtitle">показано за месяц</div>
          </div>

          <div className="retention-stat">
            <div className="retention-stat-title">Отток пользователей</div>
            <div className="retention-stat-value">45%</div>
            <div className="retention-stat-subtitle">показано за месяц</div>
          </div>
        </div>

        <div className="retention-chart-wrapper">
          <div className="retention-chart">
            <div
              style={{
                position: "relative",
                height: "230px",
                width: "100%",
              }}
            >
              <canvas ref={chartRef} />
            </div>

            <div className="retention-tooltip">
              <div className="retention-tooltip-title">Число людей</div>
              <div className="retention-tooltip-grid">
                <div className="tooltip-row">
                  <div
                    className="tooltip-cell"
                    style={{ backgroundColor: "#EDE9FB" }}
                  />
                  <div className="tooltip-number">86</div>
                </div>
                <div className="tooltip-row">
                  <div
                    className="tooltip-cell"
                    style={{ backgroundColor: "#947DE8" }}
                  />
                  <div className="tooltip-number">59</div>
                </div>

                <div className="tooltip-row">
                  <div
                    className="tooltip-cell"
                    style={{ backgroundColor: "#CABEF3" }}
                  />
                  <div className="tooltip-number">55</div>
                </div>
                <div className="tooltip-row">
                  <div
                    className="tooltip-cell"
                    style={{ backgroundColor: "#6D4EDF" }}
                  />
                  <div className="tooltip-number">42</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="retention-legend">
          <div className="retention-legend-item">
            <span>более 1 покупки</span>
            <span className="retention-legend-dot level-1" />
          </div>
          <div className="retention-legend-item">
            <span>более 2 покупок</span>
            <span className="retention-legend-dot level-2" />
          </div>
          <div className="retention-legend-item">
            <span>более 3 покупок</span>
            <span className="retention-legend-dot level-3" />
          </div>
          <div className="retention-legend-item">
            <span>более 4 покупок</span>
            <span className="retention-legend-dot level-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
