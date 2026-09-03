import { useMemo, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";
import { StatCard } from "../components/StatCard";
import { useAuth, useToast } from "../hooks";

const challenges = [
  ["route", "Desafio 200 km", "Complete 200 km durante o mês e ganhe 300 pontos."],
  ["tool", "Bike em dia", "Registre uma manutenção preventiva em uma oficina parceira."],
  ["users", "Pedal em grupo", "Participe de um evento oficial e convide dois amigos."],
] as const;

export function Club() {
  const { showToast } = useToast();
  const [joined, setJoined] = useState<Set<string>>(new Set());

  function toggleChallenge(title: string) {
    setJoined((current) => {
      const next = new Set(current);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
        showToast("Desafio aceito! Continue pedalando para completar.");
      }
      return next;
    });
  }

  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Clube do Ciclista</h1><p>Desafios, pontos, conquistas e experiências exclusivas.</p></div><span className="badge badge--green">Nível 2 · Explorador</span></div>
    <section className="stats-grid">
      <StatCard icon="star" label="Pontos acumulados" value="1.250" note="550 pontos para o próximo nível" progress={69}/>
      <StatCard icon="trophy" label="Desafios concluídos" value="7" note={`${joined.size} ativo${joined.size === 1 ? "" : "s"} agora`}/>
      <StatCard icon="users" label="Ranking regional" value="#84" note="Subiu 12 posições"/>
      <StatCard icon="gift" label="Benefícios disponíveis" value="9" note="2 expiram em breve"/>
    </section>
    <section className="module-grid">
      {challenges.map(([icon,title,text]) => (
        <Card key={title} className="module-card">
          <div className="module-icon"><Icon name={icon}/></div>
          <h3>{title}</h3>
          <p>{text}</p>
          <Button variant="ghost" onClick={() => toggleChallenge(title)}>{joined.has(title) ? "Desafio aceito ✓" : "Ver desafio"}</Button>
        </Card>
      ))}
    </section>
  </div>
}

const offers = [
  ["20%", "20% OFF em componentes", "Válido em lojas parceiras selecionadas"],
  ["R$20", "Crédito para lavagem", "Utilize em qualquer estação participante"],
  ["10%", "10% OFF em revisão geral", "Oficinas verificadas da sua região"],
];

export function Benefits() {
  const { showToast } = useToast();
  const [points, setPoints] = useState(1250);
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const [walletExpanded, setWalletExpanded] = useState(false);

  function redeem(title: string) {
    if (redeemed.includes(title)) return;
    setRedeemed((current) => [...current, title]);
    setPoints((current) => Math.max(0, current - 100));
    showToast("Benefício resgatado! -100 pts");
  }

  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Benefícios</h1><p>Ofertas exclusivas para membros do ecossistema.</p></div><Button variant="secondary" onClick={() => setWalletExpanded((v) => !v)}>Minha carteira</Button></div>
    <div className="content-split">
      <Card title="Benefícios disponíveis">
        <div className="offer-list">
          {offers.map(([tag,title,text]) => (
            <article className="offer" key={title}>
              <div className="offer__tag">{tag}</div>
              <div><strong>{title}</strong><span>{text}</span></div>
              <Button disabled={redeemed.includes(title)} onClick={() => redeem(title)}>{redeemed.includes(title) ? "Resgatado ✓" : "Resgatar"}</Button>
            </article>
          ))}
        </div>
      </Card>
      <Card title="Carteira">
        <StatCard icon="star" label="Saldo de pontos" value={`${points.toLocaleString("pt-BR")} pts`} note="Atualizado agora"/>
        <div className="list"><div className="list-row"><Icon name="gift"/><div><strong>Cupons ativos</strong><span>3 disponíveis</span></div></div><div className="list-row"><Icon name="drop"/><div><strong>Créditos de lavagem</strong><span>2 créditos</span></div></div></div>
        {walletExpanded && (
          <div className="list">
            <div className="list-row"><Icon name="clock"/><div><strong>Resgates recentes</strong><span>{redeemed.length ? redeemed.join(", ") : "Nenhum resgate ainda"}</span></div></div>
          </div>
        )}
      </Card>
    </div>
  </div>
}

const workshops = [
  ["BP", "Bike Point Performance", "0,9 km · Especializada em MTB e suspensão", ["MTB", "Suspensão"]],
  ["VC", "Velo Care Oficina", "2,4 km · Revisões, freios e transmissão", ["Freios", "Speed"]],
  ["TR", "Trail Repair", "3,1 km · E-bikes e componentes eletrônicos", ["E-bike"]],
] as const;

const workshopFilterTags = ["MTB", "Speed", "Suspensão", "E-bike", "Freios", "Bike fit"];

export function Workshops() {
  const { showToast } = useToast();
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [appliedTags, setAppliedTags] = useState<Set<string>>(new Set());
  const [scheduled, setScheduled] = useState<Set<string>>(new Set());

  function toggleTag(tag: string) {
    setSelectedTags((current) => {
      const next = new Set(current);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  function applyFilters() {
    setAppliedTags(new Set(selectedTags));
  }

  function scheduleWorkshop(title: string) {
    setScheduled((current) => new Set(current).add(title));
    showToast("Agendamento solicitado. Você receberá a confirmação da oficina.");
  }

  const filtered = appliedTags.size === 0
    ? workshops
    : workshops.filter((w) => w[3].some((tag) => appliedTags.has(tag)));

  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Oficinas</h1><p>Encontre serviços especializados e parceiros verificados.</p></div><Button variant="secondary" onClick={() => setMapOpen((v) => !v)}>{mapOpen ? "Ver lista" : "Ver no mapa"}</Button></div>
    <div className="content-split">
      <Card title="Próximas de você">
        {mapOpen && (
          <div className="map-mock"><i className="map-pin map-pin--1">1</i><i className="map-pin map-pin--2">2</i><i className="map-pin map-pin--3">3</i></div>
        )}
        {!mapOpen && (
          <div className="offer-list">
            {filtered.length === 0 && <p>Nenhuma oficina encontrada para os filtros selecionados.</p>}
            {filtered.map(([tag,title,text]) => (
              <article className="offer" key={title}>
                <div className="offer__tag">{tag}</div>
                <div><strong>{title}</strong><span>{text}</span><small className="green-text">4,9 ★</small></div>
                <Button disabled={scheduled.has(title)} onClick={() => scheduleWorkshop(title)}>{scheduled.has(title) ? "Agendado ✓" : "Agendar"}</Button>
              </article>
            ))}
          </div>
        )}
      </Card>
      <Card title="Filtros rápidos">
        <div className="tags">
          {workshopFilterTags.map((tag) => (
            <button key={tag} className={selectedTags.has(tag) ? "is-active" : ""} onClick={() => toggleTag(tag)}>{tag}</button>
          ))}
        </div>
        <Button full variant="secondary" onClick={applyFilters}>Aplicar filtros</Button>
      </Card>
    </div>
  </div>
}

const products = [
  ["shield", "Capacete MTB Pro", "Proteção premium com excelente ventilação.", 599.90],
  ["route", "Pneu 29 x 2.25", "Excelente tração em trilhas secas e mistas.", 289.90],
  ["link", "Corrente 12 velocidades", "Alta durabilidade e troca precisa.", 349.90],
  ["tool", "Revisão completa", "Agende em uma oficina parceira próxima.", 280],
] as const;

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function Marketplace() {
  const { showToast } = useToast();
  const [cartItems, setCartItems] = useState<string[]>(["Capacete MTB Pro", "Pneu 29 x 2.25"]);
  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(title: string) {
    setCartItems((current) => [...current, title]);
    showToast("Adicionado ao carrinho.");
  }

  function removeFromCart(index: number) {
    setCartItems((current) => current.filter((_, i) => i !== index));
  }

  const total = useMemo(
    () => cartItems.reduce((sum, title) => sum + (products.find((p) => p[1] === title)?.[3] ?? 0), 0),
    [cartItems]
  );

  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Marketplace</h1><p>Produtos, serviços e experiências do mundo do ciclismo.</p></div><Button variant="secondary" onClick={() => setCartOpen((v) => !v)}>Carrinho · {cartItems.length}</Button></div>
    {cartOpen && (
      <Card title="Seu carrinho" className="cart-card">
        {cartItems.length === 0 && <p>Seu carrinho está vazio.</p>}
        <div className="list">
          {cartItems.map((item, i) => (
            <div className="list-row" key={`${item}-${i}`}><Icon name="market"/><div><strong>{item}</strong></div><button className="text-action" onClick={() => removeFromCart(i)}>Remover</button></div>
          ))}
        </div>
        {cartItems.length > 0 && <div className="cart-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>}
      </Card>
    )}
    <div className="product-grid">
      {products.map(([icon,title,text,price]) => (
        <Card className="product-card" key={title}>
          <div className="product-card__visual"><Icon name={icon}/></div>
          <span className="badge badge--green">Compatível</span>
          <h3>{title}</h3>
          <p>{text}</p>
          <strong>{icon === "tool" ? `A partir de ${formatPrice(price)}` : formatPrice(price)}</strong>
          <Button full variant="secondary" onClick={() => addToCart(title)}>Adicionar</Button>
        </Card>
      ))}
    </div>
  </div>
}

const initialEvents = [
  ["12 AGO", "Pedal da Serra", "Xaxim · SC · 62 km · MTB"],
  ["24 AGO", "Workshop de manutenção", "Oficina Bike Point · 19h"],
  ["07 SET", "Desafio Gravel Oeste", "Chapecó · SC · 85 km"],
];

export function Events() {
  const [events, setEvents] = useState(initialEvents);
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  function publishEvent() {
    if (!title.trim() || !location.trim()) return;
    setEvents((current) => [["NOVO", title.trim(), location.trim()], ...current]);
    setTitle("");
    setLocation("");
    setShowForm(false);
  }

  function toggleJoin(eventTitle: string) {
    setJoined((current) => {
      const next = new Set(current);
      next.has(eventTitle) ? next.delete(eventTitle) : next.add(eventTitle);
      return next;
    });
  }

  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Eventos</h1><p>Pedais, provas, workshops e experiências da comunidade.</p></div><Button onClick={() => setShowForm((v) => !v)}>{showForm ? "Cancelar" : "Criar evento"}</Button></div>
    {showForm && (
      <Card title="Novo evento">
        <div className="form-grid">
          <label>Nome do evento<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Pedal Noturno" /></label>
          <label>Local<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ex: Xaxim · SC" /></label>
        </div>
        <Button onClick={publishEvent}>Publicar evento</Button>
      </Card>
    )}
    <Card title="Próximos eventos">
      <div className="offer-list">
        {events.map(([tag,eventTitle,text]) => (
          <article className="offer" key={eventTitle}>
            <div className="offer__tag">{tag}</div>
            <div><strong>{eventTitle}</strong><span>{text}</span></div>
            <Button disabled={joined.has(eventTitle)} onClick={() => toggleJoin(eventTitle)}>{joined.has(eventTitle) ? "Confirmado ✓" : "Participar"}</Button>
          </article>
        ))}
      </div>
    </Card>
  </div>
}

const stationList = ["Estação Centro · 0,8 km", "Estação Norte · 2,1 km", "Estação Parque · 3,4 km"];

export function Stations() {
  const { showToast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reservedIndex, setReservedIndex] = useState<number | null>(null);

  function reserveSelected() {
    setReservedIndex(selectedIndex);
    showToast(`Estação reservada: ${stationList[selectedIndex].split(" · ")[0]}`);
  }

  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Estações</h1><p>Localize, reserve e acompanhe estações inteligentes.</p></div><Button onClick={reserveSelected} disabled={reservedIndex === selectedIndex}>{reservedIndex === selectedIndex ? "Reservada ✓" : "Reservar estação"}</Button></div>
    <div className="content-split">
      <div className="map-mock">
        {stationList.map((_, i) => (
          <button key={i} className={`map-pin map-pin--${i + 1} ${i === selectedIndex ? "is-active" : ""}`} onClick={() => setSelectedIndex(i)}>{i + 1}</button>
        ))}
      </div>
      <Card title="Mais próximas">
        <div className="list">
          {stationList.map((item, i) => (
            <button key={item} className={`list-row list-row--button ${i === selectedIndex ? "is-active" : ""}`} onClick={() => setSelectedIndex(i)}>
              <Icon name="pin"/>
              <div><strong>{item}</strong><span>{i === reservedIndex ? "Reservada por você" : "Disponível agora"}</span></div>
              <span className={`badge ${i === reservedIndex ? "badge--purple" : "badge--green"}`}>{i === reservedIndex ? "Reservada" : "Livre"}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  </div>
}

const initialNotices = [
  ["tool", "Manutenção se aproximando", "Faltam aproximadamente 250 km para a próxima revisão geral.", "Há 20 minutos"],
  ["gift", "Novo benefício disponível", "Você recebeu 20% de desconto em componentes selecionados.", "Hoje, 09:10"],
  ["calendar", "Evento confirmado", "Sua participação no Pedal da Serra foi confirmada.", "Ontem"],
] as const;

export function Notifications() {
  const { showToast } = useToast();
  const [unread, setUnread] = useState<Set<number>>(new Set([0, 1]));

  function markAllRead() {
    setUnread(new Set());
    showToast("Todas as notificações foram marcadas como lidas.");
  }

  function markRead(i: number) {
    setUnread((current) => {
      if (!current.has(i)) return current;
      const next = new Set(current);
      next.delete(i);
      return next;
    });
  }

  return <div className="page"><div className="page-heading page-heading--with-action"><div><h1>Notificações</h1><p>Atualizações importantes da sua conta e bicicleta.</p></div><Button variant="secondary" onClick={markAllRead}>Marcar todas como lidas</Button></div>
    <div className="notice-list">
      {initialNotices.map(([icon,title,text,when],i) => (
        <article className={`notice ${unread.has(i) ? "notice--unread" : ""}`} key={title} onClick={() => markRead(i)}>
          <div className="notice__icon"><Icon name={icon}/></div>
          <div><strong>{title}</strong><p>{text}</p><small>{when}</small></div>
        </article>
      ))}
    </div>
  </div>
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function Profile() {
  const { showToast } = useToast();
  const { user, updateDisplayName } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(user?.displayName ?? "Ciclista");
  const [phone, setPhone] = useState("(49) 99999-9999");
  const [city, setCity] = useState("Xaxim - SC");
  const email = user?.email ?? (user?.isAnonymous ? "Conta demonstrativa (sem e-mail)" : "Não informado");

  async function handleAction() {
    if (!editing) {
      setEditing(true);
      return;
    }
    setSaving(true);
    const result = await updateDisplayName(name);
    setSaving(false);
    if (result.ok) {
      showToast("Perfil atualizado com sucesso.");
      setEditing(false);
    } else {
      showToast(result.error);
    }
  }

  return <div className="page"><div className="page-heading page-heading--with-action"><div><h1>Perfil</h1><p>Gerencie suas informações e preferências.</p></div><Button onClick={handleAction} disabled={saving}>{saving ? "Salvando..." : editing ? "Salvar alterações" : "Editar perfil"}</Button></div>
    <div className="profile-grid">
      <Card className="profile-card"><div className="profile-avatar">{initials(name)}</div><h2>{name}</h2><p>Membro desde maio de 2025</p><div className="tags"><span>MTB</span><span>Intermediário</span><span>Nível 2</span></div></Card>
      <Card title="Dados pessoais">
        <div className="form-grid">
          <label>Nome completo<input value={name} readOnly={!editing} onChange={(e) => setName(e.target.value)}/></label>
          <label>E-mail<input value={email} readOnly title="O e-mail é gerenciado pela sua conta de acesso."/></label>
          <label>Telefone<input value={phone} readOnly={!editing} onChange={(e) => setPhone(e.target.value)}/></label>
          <label>Cidade<input value={city} readOnly={!editing} onChange={(e) => setCity(e.target.value)}/></label>
        </div>
      </Card>
    </div>
  </div>
}

export function Settings() {
  const { user, signOut } = useAuth();
  const { showToast } = useToast();
  const rows = [
    ["bell", "Notificações de manutenção", "Receber lembretes e alertas preventivos"],
    ["gift", "Novos benefícios", "Receber avisos de cupons e campanhas"],
    ["shield", "Compartilhamento de dados", "Permitir relatórios agregados e anonimizados"],
    ["settings", "Aparência escura", "Tema visual padrão do aplicativo"],
  ] as const;
  const [on, setOn] = useState(rows.map((_, i) => i !== 2));

  function toggle(i: number) {
    setOn((current) => current.map((v, idx) => (idx === i ? !v : v)));
  }

  async function handleLogout() {
    await signOut();
    showToast("Sessão encerrada.");
  }

  return <div className="page"><div className="page-heading"><div><h1>Configurações</h1><p>Controle notificações, privacidade e preferências.</p></div></div><div className="settings-list">{rows.map(([icon,title,text],i) => <article className="setting-row" key={title}><Icon name={icon}/><div><strong>{title}</strong><span>{text}</span></div><button className={`switch ${on[i] ? "is-on" : ""}`} onClick={() => toggle(i)}><i/></button></article>)}</div>
    <Card title="Conta" className="account-card">
      <div className="list-row"><Icon name="user"/><div><strong>{user?.displayName ?? "Ciclista"}</strong><span>{user?.email ?? (user?.isAnonymous ? "Conta demonstrativa" : "")}</span></div></div>
      <Button full variant="secondary" onClick={handleLogout}>Sair da conta</Button>
    </Card>
  </div>
}
