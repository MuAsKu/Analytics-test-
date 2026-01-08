import { useMemo, useState, useCallback } from "react";
import "./Heatmap.css";

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
    <div className="heatmap-card">
      <div className="heatmap-header">
        <div className="heatmap-title">Пиковое время использования карт</div>
        <div className="heatmap-subtitle">1 марта 2025 - 31 марта 2025</div>
      </div>

      <div className="heatmap-body">
        <div className="heatmap-y">
          {HOURS.map((hour) => (
            <div key={hour} className="y-label">
              {hour}
            </div>
          ))}
        </div>

        <div className="heatmap-container">
          <div className="heatmap-grid">
            {data.map((dayRow) =>
              dayRow.map((cell) => {
                const isActive =
                  activeCell?.day === cell.day &&
                  activeCell?.hour === cell.hour;

                return (
                  <div
                    key={`${cell.day}-${cell.hour}`}
                    className={`heatmap-cell ${cell.level} ${
                      isActive ? "active" : ""
                    }`}
                    onMouseMove={(e) => handleCellMouseMove(e, cell)}
                    onMouseLeave={handleCellMouseLeave}
                  />
                );
              })
            )}
          </div>

          <div className="heatmap-x-container">
            <div className="heatmap-x">
              {DAYS.map((day) => (
                <div key={day} className="x-label">
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="heatmap-legend">
        <div className="legend-item">
          <span>1–50 раз</span>
          <span className="legend-dot level-1" />
        </div>
        <div className="legend-item">
          <span>51–100 раз</span>
          <span className="legend-dot level-2" />
        </div>
        <div className="legend-item">
          <span>100–150 раз</span>
          <span className="legend-dot level-3" />
        </div>
      </div>

      {tooltip && (
        <div
          className="heatmap-tooltip"
          style={{
            top: tooltip.top,
            left: tooltip.left,
          }}
        >
          <div className="tooltip-time">
            {tooltip.hour.replace(":00", "")}:00–{tooltip.hour}, {tooltip.day}{" "}
            марта 2025
          </div>
          <div className="tooltip-row">
            <span className={`tooltip-dot ${tooltip.level}`} />
            <span>{tooltip.value} раз</span>
          </div>
        </div>
      )}
    </div>
  );
}
