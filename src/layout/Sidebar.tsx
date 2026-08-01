import { Brand } from "../components/Brand";
import { Icon } from "../components/Icon";
import { navigationItems } from "../routes";
import type { PageId } from "../types";

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
          <div><Brand /><p>Sua plataforma completa<br />para o mundo do ciclismo.</p></div>
          <button className="sidebar__close" onClick={onClose}><Icon name="close" /></button>
        </div>

        <div className="user-card">
          <div className="user-card__avatar"><img src="/assets/dashboard-avatar.jpg" alt="Jhonatan Ilha" /></div>
          <div>
            <strong>Jhonatan Ilha</strong>
            <span>Clube · Nível 2 · 1.250 pts</span>
          </div>
        </div>

        <nav className="sidebar__nav">
          {navigationItems.map((item) => (
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
