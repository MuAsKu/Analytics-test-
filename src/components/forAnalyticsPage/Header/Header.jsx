import "./Header.css";
import { useState } from "react";

export default function Header() {
  const [activePeriod, setActivePeriod] = useState("today");
  const [selectLanguege, setSelectLanguege] = useState(false);
  const [currentLang, setCurrentLang] = useState("RU");

  const periods = [
    { id: "today", label: "Сегодня" },
    { id: "week", label: "Неделя" },
    { id: "month", label: "Месяц" },
    { id: "year", label: "Год" },
  ];

  const languages = [
    {
      code: "RU",
      label: "Русский",
      img: "../../../flags/russia.png",
    },
    {
      code: "ENG",
      label: "English",
      img: "../../../flags/usa.png",
    },
    {
      code: "КР",
      label: "Кыргызча",
      img: "../../../flags/kyrgyzstan.png",
    },
  ];

  const handleLanguageSelect = (langCode) => {
    setCurrentLang(langCode);
    setSelectLanguege(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  return (
    <header className="header">
      <div className="header-left">
        <div className="breadcrumb">
          <span className="breadcrumb-dot" />
          Карты
        </div>

        <h1 className="title">Добро пожаловать!</h1>
        <p className="subtitle">
          1 февраля 2025, 07:00 – 1 марта 2025, 06:00{" "}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            style={{ fill: "#9ca3af" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
          </svg>
        </p>
      </div>

      <div className="header-right">
        <div className="top-buttons">
          <button className="scan-btn">
            Отсканировать
            <img
              src="../../../icons/qr-scan.svg"
              alt="scan"
              className="scan-icon"
            />
          </button>

          <div className="language-selector">
            <div
              className="lang"
              onClick={() => setSelectLanguege(!selectLanguege)}
            >
              {currentLanguage && (
                <img
                  src={currentLanguage.img}
                  alt={currentLanguage.code}
                  className="flag-img"
                />
              )}
              {currentLang}
              <span className={`arrowLang ${selectLanguege ? "open" : ""}`} />
            </div>

            {selectLanguege && (
              <div className="language-dropdown">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="language-option"
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <img
                      src={lang.img}
                      alt={lang.code}
                      className="flag-img-option"
                    />
                    <span className="language-label">{lang.label}</span>
                    <span className="language-code">{lang.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="account">
            Мой аккаунт
            <span className="avatar" />
          </div>
        </div>

        <div className="date-picker-container">
          <div className="date-picker">
            <div className="period-selector">
              {periods.map((period) => (
                <button
                  key={period.id}
                  className={`period-btn ${
                    activePeriod === period.id ? "active" : ""
                  }`}
                  onClick={() => setActivePeriod(period.id)}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
          <button className="custom-date-btn">
            <img
              src="../../../icons/calendar.svg"
              alt="calendar"
              className="calendar-icon"
            />
            выбрать дату
          </button>
        </div>
      </div>
    </header>
  );
}
