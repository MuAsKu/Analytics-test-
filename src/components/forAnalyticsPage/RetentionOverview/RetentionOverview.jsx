import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import "./RetentionOverview.css";

export default function RetentionOverview() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: days.map((d) => d.toString()),
        datasets: [
          {
            label: "Коэффициент удержания",
            data: days.map(() => Math.floor(Math.random() * 40) + 40),
            backgroundColor: "#e9e7ff",
            borderColor: "#e9e7ff",
            borderWidth: 0,
            borderRadius: 3,
            barPercentage: 0.3,
            categoryPercentage: 0.8,
          },
          {
            label: "Отток пользователей",
            data: days.map(() => Math.floor(Math.random() * 30) + 30),
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
