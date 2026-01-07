import React from "react";
import "./AnalyticsCards.css";

export default function AnalyticsCards() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  // eslint-disable-next-line react-hooks/purity
  const lineHeights = days.map(() => Math.random() * 70 + 30);

  return (
    <div className="analytics-wrapper">
      <div className="analytics-card">
        <div className="header-row">
          <Stat
            title="Среднее количество накопленных"
            value="234 567"
            subtitle="показано за месяц"
          />
          <Stat
            title="Среднее количество потраченных"
            value="654 578"
            subtitle="показано за месяц"
          />
        </div>

        <div className="chart-wrapper">
          <div className="y-axis">
            {[100, 80, 60, 40, 20, 0].map((v) => (
              <div key={v} className="y-tick">
                {v}
              </div>
            ))}
          </div>

          <div className="chart">
            {[0, 20, 40, 60, 80, 100].map((v) => (
              <div key={v} className="h-grid" style={{ bottom: `${v}%` }} />
            ))}

            {days.map((_, i) => (
              <div
                key={i}
                className="v-grid"
                style={{ left: `${(i / days.length) * 100}%` }}
              />
            ))}

            <div className="bars-row">
              {days.map((d) => (
                <div key={d} className="bar-group">
                  <div
                    className="bar bar-light"
                    style={{ height: `${60 + (d % 5) * 5}%` }}
                  />
                  <div
                    className="bar bar-dark"
                    style={{ height: `${45 + (d % 7) * 4}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="vertical-lines">
              {days.map((d, i) => (
                <div
                  key={d}
                  className="vertical-line"
                  style={{
                    left: `${(i / days.length) * 100 + 100 / days.length / 2}%`,
                    height: `${lineHeights[i]}%`,
                  }}
                />
              ))}
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

        <div className="x-axis">
          {days.map((d) => (
            <div key={d} className="x-tick">
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, subtitle }) {
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-subtitle">{subtitle}</div>
    </div>
  );
}
