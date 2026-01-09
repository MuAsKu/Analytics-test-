import { useState, useCallback } from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [openCards, setOpenCards] = useState(false);
  const [openCatalogs, setOpenCatalogs] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [openClients, setOpenClients] = useState(false);
  const [openIntegrations, setOpenIntegrations] = useState(false);

  const toggleCards = useCallback(() => setOpenCards((prev) => !prev), []);
  const toggleCatalogs = useCallback(() => setOpenCatalogs((prev) => !prev), []);
  const toggleTeam = useCallback(() => setOpenTeam((prev) => !prev), []);
  const toggleClients = useCallback(() => setOpenClients((prev) => !prev), []);
  const toggleIntegrations = useCallback(() => setOpenIntegrations((prev) => !prev), []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="logo" />
      </div>

      <nav className={styles.menu}>
        <div className={styles.menuTop}>
          <div className={styles.menuItem}>
            <img src="/icons/home.svg" alt="home" className={styles.icon} />
            Главная
          </div>

          <div className={styles.menuItem}>
            <img src="/icons/analytics.svg" alt="analytics" className={styles.icon} />
            Аналитика
          </div>

          <div className={styles.menuItem}>
            <img
              src="/icons/notifications.svg"
              alt="notifications"
              className={styles.icon}
            />
            Уведомления
          </div>
        </div>

        <div className={styles.menuScrollable}>
          <div className={styles.menuSection}>Инструменты</div>

          <div
            className={`${styles.menuItem} ${styles.accordion}`}
            onClick={toggleCards}
          >
            <div className={styles.row}>
              <img src="/icons/card.svg" alt="card" className={styles.icon} />
              Карты
            </div>
            <span className={`${styles.arrow} ${openCards ? styles.open : ""}`} />
          </div>

          {openCards && (
            <div className={styles.submenu}>
              <div className={styles.submenuLine} />
              <div className={styles.submenuItem}>Кэшбек карта</div>
              <div className={styles.submenuItem}>Скидочная карта</div>
              <div className={styles.submenuItem}>Купоны</div>
            </div>
          )}

          <div
            className={`${styles.menuItem} ${styles.accordion}`}
            onClick={toggleCatalogs}
          >
            <div className={styles.row}>
              <img src="/icons/catalog.svg" alt="catalog" className={styles.icon} />
              Каталоги
            </div>
            <span className={`${styles.arrow} ${openCatalogs ? styles.open : ""}`} />
          </div>

          {openCatalogs && (
            <div className={styles.submenu}>
              <div className={styles.submenuLine} />
              <div className={styles.submenuItem}>Мои каталоги</div>
              <div className={styles.submenuItem}>Все каталоги</div>
            </div>
          )}

          <div className={styles.menuSection}>Управление</div>

          <div
            className={`${styles.menuItem} ${styles.accordion}`}
            onClick={toggleTeam}
          >
            <div className={styles.row}>
              <img src="/icons/team.svg" alt="team" className={styles.icon} />
              Команда
            </div>
            <span className={`${styles.arrow} ${openTeam ? styles.open : ""}`} />
          </div>

          {openTeam && (
            <div className={styles.submenu}>
              <div className={styles.submenuLine} />
              <div className={styles.submenuItem}>Сотрудники</div>
              <div className={styles.submenuItem}>Должности</div>
              <div className={styles.submenuItem}>Реферальная система</div>
            </div>
          )}

          <div
            className={`${styles.menuItem} ${styles.accordion}`}
            onClick={toggleClients}
          >
            <div className={styles.row}>
              <img src="/icons/clients.svg" alt="clients" className={styles.icon} />
              Клиенты
            </div>
            <span className={`${styles.arrow} ${openClients ? styles.open : ""}`} />
          </div>

          {openClients && (
            <div className={styles.submenu}>
              <div className={styles.submenuLine} />
              <div className={styles.submenuItem}>Аналитика</div>
              <div className={styles.submenuItem}>Реферальная система</div>
            </div>
          )}
          <div
            className={`${styles.menuItem} ${styles.accordion}`}
            onClick={toggleIntegrations}
          >
            <div className={styles.row}>
              <img
                src="/icons/integrations.svg"
                alt="integrations"
                className={styles.icon}
              />
              Интеграции
            </div>
            <span className={`${styles.arrow} ${openIntegrations ? styles.open : ""}`} />
          </div>

          {openIntegrations && (
            <div className={styles.submenu}>
              <div className={styles.submenuLine} />
              <div className={styles.submenuItem}>Пусто</div>
              <div className={styles.submenuItem}>Пусто</div>
            </div>
          )}
        </div>

        <div className={styles.menuBottom}>
          <div className={styles.menuFooter}>
            <div className={styles.menuItem}>
              <img src="/icons/support.svg" alt="support" className={styles.icon} />
              Поддержка
              <span className={styles.dots}>•••</span>
            </div>

            <div className={styles.menuItem}>
              <img src="/icons/settings.svg" alt="settings" className={styles.icon} />
              Настройки
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
