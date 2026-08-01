import { Brand } from "../components/Brand";
import { Icon } from "../components/Icon";
import type { PageId } from "../types";

const items: Array<{ id: PageId; label: string; icon: Parameters<typeof Icon>[0]["name"] }> = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "bike", label: "Minha Bike", icon: "bike" },
  { id: "club", label: "Clube do Ciclista", icon: "club" },
  { id: "benefits", label: "Benefícios", icon: "gift" },
  { id: "workshops", label: "Oficinas", icon: "tool" },
  { id: "marketplace", label: "Marketplace", icon: "market" },
  { id: "events", label: "Eventos", icon: "calendar" },
  { id: "stations", label: "Estações", icon: "drop" },
  { id: "notifications", label: "Notificações", icon: "bell" },
  { id: "profile", label: "Perfil", icon: "user" },
  { id: "settings", label: "Configurações", icon: "settings" },
];

export function Sidebar({
  active,
  onChange,
  open,
  onClose,
}: {
  active: PageId;
  onChange: (page: PageId) => void;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && <button className="scrim" aria-label="Fechar menu" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <Brand />
          <button className="sidebar__close" onClick={onClose}><Icon name="close" /></button>
        </div>

        <div className="user-card">
          <div className="user-card__avatar">JI</div>
          <div>
            <strong>Jhonatan Ilha</strong>
            <span>Clube · Nível 2 · 1.250 pts</span>
          </div>
        </div>

        <nav className="sidebar__nav">
          {items.map((item) => (
            <button
              key={item.id}
              className={active === item.id ? "is-active" : ""}
              onClick={() => {
                onChange(item.id);
                onClose();
              }}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pro-panel">
          <Icon name="star" />
          <strong>Seja PRO</strong>
          <p>Recursos exclusivos, créditos e benefícios ampliados.</p>
        </div>

        <small className="version">Developer Preview 1.0</small>
      </aside>
    </>
  );
}
