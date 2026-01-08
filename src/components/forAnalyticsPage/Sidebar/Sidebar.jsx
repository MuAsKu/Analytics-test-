import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const [openCards, setOpenCards] = useState(false);
  const [openCatalogs, setOpenCatalogs] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [openClients, setOpenClients] = useState(false);
  const [openIntegrations, setOpenIntegrations] = useState(false);

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>

      <nav className="menu">
        <div className="menu-item">
          <img src="/icons/home.svg" alt="home" className="icon" />
          Главная
        </div>

        <div className="menu-item">
          <img src="/icons/analytics.svg" alt="analytics" className="icon" />
          Аналитика
        </div>

        <div className="menu-item">
          <img
            src="/icons/notifications.svg"
            alt="notifications"
            className="icon"
          />
          Уведомления
        </div>

        <div className="menu-section">Инструменты</div>

        <div
          className="menu-item accordion"
          onClick={() => setOpenCards(!openCards)}
        >
          <div className="row">
            <img src="/icons/card.svg" alt="card" className="icon" />
            Карты
          </div>
          <span className={`arrow ${openCards ? "open" : ""}`} />
        </div>

        {openCards && (
          <div className="submenu">
            <div className="submenu-line" />
            <div className="submenu-item">Кэшбек карта</div>
            <div className="submenu-item">Скидочная карта</div>
            <div className="submenu-item">Купоны</div>
          </div>
        )}

        <div
          className="menu-item accordion"
          onClick={() => setOpenCatalogs(!openCatalogs)}
        >
          <div className="row">
            <img src="/icons/catalog.svg" alt="catalog" className="icon" />
            Каталоги
          </div>
          <span className={`arrow ${openCatalogs ? "open" : ""}`} />
        </div>

        {openCatalogs && (
          <div className="submenu">
            <div className="submenu-line" />
            <div className="submenu-item">Мои каталоги</div>
            <div className="submenu-item">Все каталоги</div>
          </div>
        )}

        <div className="menu-section">Управление</div>

        <div
          className="menu-item accordion"
          onClick={() => setOpenTeam(!openTeam)}
        >
          <div className="row">
            <img src="/icons/team.svg" alt="team" className="icon" />
            Команда
          </div>
          <span className={`arrow ${openTeam ? "open" : ""}`} />
        </div>

        {openTeam && (
          <div className="submenu">
            <div className="submenu-line" />
            <div className="submenu-item">Сотрудники</div>
            <div className="submenu-item">Должности</div>
            <div className="submenu-item">Реферальная система</div>
          </div>
        )}

        <div
          className="menu-item accordion"
          onClick={() => setOpenClients(!openClients)}
        >
          <div className="row">
            <img src="/icons/clients.svg" alt="clients" className="icon" />
            Клиенты
          </div>
          <span className={`arrow ${openClients ? "open" : ""}`} />
        </div>

        {openClients && (
          <div className="submenu">
            <div className="submenu-line" />
            <div className="submenu-item">Аналитика</div>
            <div className="submenu-item">Реферальная система</div>
          </div>
        )}
        <div
          className="menu-item accordion"
          onClick={() => setOpenIntegrations(!openIntegrations)}
        >
          <div className="row">
            <img
              src="/icons/integrations.svg"
              alt="integrations"
              className="icon"
            />
            Интеграции
          </div>
          <span className={`arrow ${openIntegrations ? "open" : ""}`} />
        </div>

        {openIntegrations && (
          <div className="submenu">
            <div className="submenu-line" />
            <div className="submenu-item">Пусто</div>
            <div className="submenu-item">Пусто</div>
          </div>
        )}

        <div className="menu-footer">
          <div className="menu-item">
            <img src="/icons/support.svg" alt="support" className="icon" />
            Поддержка
            <span className="dots">•••</span>
          </div>

          <div className="menu-item">
            <img src="/icons/settings.svg" alt="settings" className="icon" />
            Настройки
          </div>
        </div>
      </nav>
    </aside>
  );
}
