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
import styles from "./RetentionOverview.module.css";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ChartTooltip,
  Legend,
  Title
);

const TOOLTIP_DATA = [
  { color: "#EDE9FB", value: 86 },
  { color: "#947DE8", value: 59 },
  { color: "#CABEF3", value: 55 },
  { color: "#6D4EDF", value: 42 },
];

export default function RetentionOverview() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartData = useMemo(() => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const dataRetention = days.map(() => Math.floor(Math.random() * 15) + 15);
    const dataChurn = days.map(
      (_, i) => dataRetention[i] - Math.floor(Math.random() * 3)
    );
    return { days, dataRetention, dataChurn };
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
            data: chartData.dataRetention,
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
            data: chartData.dataChurn,
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
            data: chartData.dataChurn,
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
            data: chartData.dataChurn,
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
    <div className={styles.retentionWrapper}>
      <div className={styles.retentionCard}>
        <div className={styles.retentionHeader}>
          <div className={styles.retentionStat}>
            <div className={styles.retentionStatTitle}>
              Коэффициент удержания
            </div>
            <div className={styles.retentionStatValue}>76%</div>
            <div className={styles.retentionStatSubtitle}>
              показано за месяц
            </div>
          </div>

          <div className={styles.retentionStat}>
            <div className={styles.retentionStatTitle}>Отток пользователей</div>
            <div className={styles.retentionStatValue}>45%</div>
            <div className={styles.retentionStatSubtitle}>
              показано за месяц
            </div>
          </div>
        </div>

        <div className={styles.retentionChartWrapper}>
          <div className={styles.retentionChart}>
            <div
              style={{
                position: "relative",
                height: "230px",
                width: "100%",
              }}
            >
              <canvas ref={chartRef} />
            </div>

            <div className={styles.retentionTooltip}>
              <div className={styles.retentionTooltipTitle}>Число людей</div>
              <div className={styles.retentionTooltipGrid}>
                {TOOLTIP_DATA.map((item, index) => (
                  <div key={index} className={styles.tooltipRow}>
                    <div
                      className={styles.tooltipCell}
                      style={{ backgroundColor: item.color }}
                    />
                    <div className={styles.tooltipNumber}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.retentionLegend}>
          <div className={styles.retentionLegendItem}>
            <span>более 1 покупки</span>
            <span className={`${styles.retentionLegendDot} ${styles.level1}`} />
          </div>
          <div className={styles.retentionLegendItem}>
            <span>более 2 покупок</span>
            <span className={`${styles.retentionLegendDot} ${styles.level2}`} />
          </div>
          <div className={styles.retentionLegendItem}>
            <span>более 3 покупок</span>
            <span className={`${styles.retentionLegendDot} ${styles.level3}`} />
          </div>
          <div className={styles.retentionLegendItem}>
            <span>более 4 покупок</span>
            <span className={`${styles.retentionLegendDot} ${styles.level4}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
