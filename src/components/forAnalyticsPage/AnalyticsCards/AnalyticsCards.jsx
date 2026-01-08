import { useRef, useEffect, useMemo } from "react";
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
import styles from "./AnalyticsCards.module.css";

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

  const chartData = useMemo(() => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const dataDark = days.map(() => Math.floor(Math.random() * 25) + 20);
    const dataLight = days.map(
      (_, i) => dataDark[i] + Math.floor(Math.random() * 15) + 8
    );
    return { days, dataDark, dataLight };
  }, []);

  useEffect(() => {
    const ctx = chartRef.current;

    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.days.map((d) => d.toString()),
        datasets: [
          {
            label: "Накопленные",
            data: chartData.dataLight,
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
            label: "Потраченные",
            data: chartData.dataDark,
            backgroundColor: "#EDE9FB",
            borderColor: "#EDE9FB",
            borderWidth: 0,
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
              color: (ctx) =>
                Number(ctx.tick.value) % 2 === 0 ? "#262626" : "#9a9a9a",
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
  }, [chartData]);

  return (
    <div className={styles.analyticsWrapper}>
      <div className={styles.analyticsCard}>
        <div className={styles.headerRow}>
          <div className={styles.stat}>
            <div className={styles.statTitle}>Среднее количество накопленных</div>
            <div className={styles.statValue}>234 567</div>
            <div className={styles.statSubtitle}>показано за месяц</div>
          </div>

          <div className={styles.stat}>
            <div className={styles.statTitle}>Среднее количество потраченных</div>
            <div className={styles.statValue}>654 578</div>
            <div className={styles.statSubtitle}>показано за месяц</div>
          </div>
        </div>

        <div className={styles.chartWrapper}>
          <div className={styles.chart}>
            <div
              style={{
                position: "relative",
                height: "230px",
                width: "100%",
              }}
            >
              <canvas ref={chartRef} id="analytics-chart" />
            </div>

            <div className={styles.tooltip}>
              <div className={styles.tooltipTitle}>Бонусы</div>
              <div className={styles.tooltipRow}>
                <span className={`${styles.dot} ${styles.dotLight}`} />
                85 (накопленные)
              </div>
              <div className={styles.tooltipRow}>
                <span className={`${styles.dot} ${styles.dotDark}`} />
                55 (потраченные)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
