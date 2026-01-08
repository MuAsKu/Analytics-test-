import { useMemo, useState, useCallback } from "react";
import styles from "./Heatmap.module.css";

const HOURS = [
  "24:00",
  "22:00",
  "20:00",
  "18:00",
  "16:00",
  "14:00",
  "12:00",
  "10:00",
  "08:00",
  "06:00",
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const LEVELS = ["level-0", "level-1", "level-2", "level-3"];

const LEVEL_CLASS_MAP = {
  "level-1": styles.level1,
  "level-2": styles.level2,
  "level-3": styles.level3,
};

export default function Heatmap() {
  const [tooltip, setTooltip] = useState(null);
  const [activeCell, setActiveCell] = useState(null);

  const data = useMemo(
    () =>
      DAYS.map((day) =>
        HOURS.map((hour) => ({
          day,
          hour,
          level: LEVELS[Math.floor(Math.random() * LEVELS.length)],
          value: 115,
        }))
      ),
    []
  );

  const handleCellMouseMove = useCallback((e, cell) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveCell({ day: cell.day, hour: cell.hour });
    setTooltip({
      ...cell,
      left: rect.right + 5,
      top: rect.top,
    });
  }, []);

  const handleCellMouseLeave = useCallback(() => {
    setActiveCell(null);
    setTooltip(null);
  }, []);

  return (
    <div className={styles.heatmapCard}>
      <div className={styles.heatmapHeader}>
        <div className={styles.heatmapTitle}>Пиковое время использования карт</div>
        <div className={styles.heatmapSubtitle}>1 марта 2025 - 31 марта 2025</div>
      </div>

      <div className={styles.heatmapBody}>
        <div className={styles.heatmapY}>
          {HOURS.map((hour) => (
            <div key={hour} className={styles.yLabel}>
              {hour}
            </div>
          ))}
        </div>

        <div className={styles.heatmapContainer}>
          <div className={styles.heatmapGrid}>
            {data.map((dayRow) =>
              dayRow.map((cell) => {
                const isActive =
                  activeCell?.day === cell.day &&
                  activeCell?.hour === cell.hour;

                return (
                  <div
                    key={`${cell.day}-${cell.hour}`}
                    className={`${styles.heatmapCell} ${LEVEL_CLASS_MAP[cell.level] || ""} ${
                      isActive ? styles.active : ""
                    }`}
                    onMouseMove={(e) => handleCellMouseMove(e, cell)}
                    onMouseLeave={handleCellMouseLeave}
                  />
                );
              })
            )}
          </div>

          <div className={styles.heatmapXContainer}>
            <div className={styles.heatmapX}>
              {DAYS.map((day) => (
                <div
                  key={day}
                  className={`${styles.xLabel} ${day % 2 === 0 ? styles.even : ""}`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.heatmapLegend}>
        <div className={styles.legendItem}>
          <span>1–50 раз</span>
          <span className={`${styles.legendDot} ${styles.level1}`} />
        </div>
        <div className={styles.legendItem}>
          <span>51–100 раз</span>
          <span className={`${styles.legendDot} ${styles.level2}`} />
        </div>
        <div className={styles.legendItem}>
          <span>100–150 раз</span>
          <span className={`${styles.legendDot} ${styles.level3}`} />
        </div>
      </div>

      {tooltip && (
        <div
          className={styles.heatmapTooltip}
          style={{
            top: tooltip.top,
            left: tooltip.left,
          }}
        >
          <div className={styles.tooltipTime}>
            {tooltip.hour.replace(":00", "")}:00–{tooltip.hour}, {tooltip.day}{" "}
            марта 2025
          </div>
          <div className={styles.tooltipRow}>
            <span className={`${styles.tooltipDot} ${LEVEL_CLASS_MAP[tooltip.level] || ""}`} />
            <span>{tooltip.value} раз</span>
          </div>
        </div>
      )}
    </div>
  );
}
