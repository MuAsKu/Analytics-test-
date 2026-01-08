import { useState, useMemo, useCallback } from "react";
import styles from "./Header.module.css";

const PERIODS = [
  { id: "today", label: "Сегодня" },
  { id: "week", label: "Неделя" },
  { id: "month", label: "Месяц" },
  { id: "year", label: "Год" },
];

const LANGUAGES = [
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

export default function Header() {
  const [activePeriod, setActivePeriod] = useState("today");
  const [selectLanguage, setSelectLanguage] = useState(false);
  const [currentLang, setCurrentLang] = useState("RU");

  const handleLanguageSelect = useCallback((langCode) => {
    setCurrentLang(langCode);
    setSelectLanguage(false);
  }, []);

  const toggleLanguageDropdown = useCallback(() => {
    setSelectLanguage((prev) => !prev);
  }, []);

  const currentLanguage = useMemo(
    () => LANGUAGES.find((lang) => lang.code === currentLang),
    [currentLang]
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbDot} />
          Карты
        </div>

        <h1 className={styles.title}>Добро пожаловать!</h1>
        <p className={styles.subtitle}>
          1 февраля 2025, 07:00 – 1 марта 2025, 06:00{" "}
          <img src="/icons/help-circle.svg" alt="help" />
        </p>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.topButtons}>
          <button className={styles.scanBtn}>
            Отсканировать
            <img src="/icons/qr-scan.svg" alt="scan" className={styles.scanIcon} />
          </button>

          <div className={styles.languageSelector}>
            <div className={styles.lang} onClick={toggleLanguageDropdown}>
              {currentLanguage && (
                <img
                  src={currentLanguage.img}
                  alt={currentLanguage.code}
                  className={styles.flagImg}
                />
              )}
              {currentLang}
              <span className={`${styles.arrowLang} ${selectLanguage ? styles.open : ""}`} />
            </div>

            {selectLanguage && (
              <div className={styles.languageDropdown}>
                {LANGUAGES.map((lang) => (
                  <div
                    key={lang.code}
                    className={styles.languageOption}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <img
                      src={lang.img}
                      alt={lang.code}
                      className={styles.flagImgOption}
                    />
                    <span className={styles.languageLabel}>{lang.label}</span>
                    <span className={styles.languageCode}>{lang.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.account}>
            Мой аккаунт
            <span className={styles.avatar} />
          </div>
        </div>

        <div className={styles.datePickerContainer}>
          <div className={styles.datePicker}>
            <div className={styles.periodSelector}>
              {PERIODS.map((period) => (
                <button
                  key={period.id}
                  className={`${styles.periodBtn} ${
                    activePeriod === period.id ? styles.active : ""
                  }`}
                  onClick={() => setActivePeriod(period.id)}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
          <button className={styles.customDateBtn}>
            <img
              src="/icons/calendar.svg"
              alt="calendar"
              className={styles.calendarIcon}
            />
            выбрать дату
          </button>
        </div>
      </div>
    </header>
  );
}
