import { Icon } from "../components/Icon";

export function Topbar({ onMenu, onNotifications }: { onMenu: () => void; onNotifications: () => void }) {
  return (
    <header className="topbar">
      <button className="icon-button topbar__menu" onClick={onMenu}><Icon name="menu" /></button>
      <div className="topbar__search">
        <Icon name="search" />
        <span>Buscar na plataforma...</span>
      </div>
      <button className="icon-button" onClick={onNotifications}><Icon name="bell" /></button>
      <div className="points-pill"><Icon name="club" />1.250 pts</div>
    </header>
  );
}
