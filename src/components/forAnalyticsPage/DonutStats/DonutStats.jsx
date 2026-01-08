import { useRef, useEffect, useMemo } from "react";
import { Chart } from "chart.js/auto";
import styles from "./DonutStats.module.css";

const DONUT_CARDS_DATA = [
  {
    title: "Активность карт",
    items: [
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
    ],
  },
  {
    title: "Добавленных карт",
    items: [
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
    ],
  },
];

function DonutCard({ title, items }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartColors = useMemo(
    () => items.map((item) => item.color),
    [items]
  );

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
            backgroundColor: chartColors,
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
  }, [chartColors]);

  return (
    <div className={styles.donutCard}>
      <div className={styles.donutChart}>
        <canvas ref={chartRef} width="160" height="160" />
      </div>

      <div className={styles.donutTitle}>{title}</div>

      <div className={styles.donutLegend}>
        {items.map((item) => (
          <div key={item.label} className={styles.donutRow}>
            <div className={styles.donutLabel}>
              <span className={styles.donutDot} style={{ background: item.color }} />
              {item.label}
            </div>
            <div className={styles.donutValues}>
              <span>{item.value}</span>
              <strong>{item.percent}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DonutStats() {
  return (
    <div className={styles.donutGrid}>
      {DONUT_CARDS_DATA.map((card) => (
        <DonutCard key={card.title} title={card.title} items={card.items} />
      ))}
    </div>
  );
}
