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
      img: "/flags/russia.png",
    },
    {
      code: "ENG",
      label: "English",
      img: "/flags/usa.png",
    },
    {
      code: "КР",
      label: "Кыргызча",
      img: "/flags/kyrgyzstan.png",
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
          <img src="/icons/help-circle.svg" alt="help" />
        </p>
      </div>

      <div className="header-right">
        <div className="top-buttons">
          <button className="scan-btn">
            Отсканировать
            <img src="/icons/qr-scan.svg" alt="scan" className="scan-icon" />
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
              src="/icons/calendar.svg"
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
