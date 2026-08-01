import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";
import { StatCard } from "../components/StatCard";

export function Club() {
  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Clube do Ciclista</h1><p>Desafios, pontos, conquistas e experiências exclusivas.</p></div><span className="badge badge--green">Nível 2 · Explorador</span></div>
    <section className="stats-grid">
      <StatCard icon="star" label="Pontos acumulados" value="1.250" note="550 pontos para o próximo nível" progress={69}/>
      <StatCard icon="trophy" label="Desafios concluídos" value="7" note="3 ativos neste mês"/>
      <StatCard icon="users" label="Ranking regional" value="#84" note="Subiu 12 posições"/>
      <StatCard icon="gift" label="Benefícios disponíveis" value="9" note="2 expiram em breve"/>
    </section>
    <section className="module-grid">
      {[
        ["route","Desafio 200 km","Complete 200 km durante o mês e ganhe 300 pontos."],
        ["tool","Bike em dia","Registre uma manutenção preventiva em uma oficina parceira."],
        ["users","Pedal em grupo","Participe de um evento oficial e convide dois amigos."]
      ].map(([icon,title,text]) => <Card key={title} className="module-card"><div className="module-icon"><Icon name={icon as any}/></div><h3>{title}</h3><p>{text}</p><Button variant="ghost">Ver desafio</Button></Card>)}
    </section>
  </div>
}

export function Benefits() {
  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Benefícios</h1><p>Ofertas exclusivas para membros do ecossistema.</p></div><Button variant="secondary">Minha carteira</Button></div>
    <div className="content-split">
      <Card title="Benefícios disponíveis">
        <div className="offer-list">
          {[
            ["20%","20% OFF em componentes","Válido em lojas parceiras selecionadas"],
            ["R$20","Crédito para lavagem","Utilize em qualquer estação participante"],
            ["10%","10% OFF em revisão geral","Oficinas verificadas da sua região"]
          ].map(([tag,title,text]) => <article className="offer" key={title}><div className="offer__tag">{tag}</div><div><strong>{title}</strong><span>{text}</span></div><Button>Resgatar</Button></article>)}
        </div>
      </Card>
      <Card title="Carteira">
        <StatCard icon="star" label="Saldo de pontos" value="1.250 pts" note="Atualizado agora"/>
        <div className="list"><div className="list-row"><Icon name="gift"/><div><strong>Cupons ativos</strong><span>3 disponíveis</span></div></div><div className="list-row"><Icon name="drop"/><div><strong>Créditos de lavagem</strong><span>2 créditos</span></div></div></div>
      </Card>
    </div>
  </div>
}

export function Workshops() {
  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Oficinas</h1><p>Encontre serviços especializados e parceiros verificados.</p></div><Button variant="secondary">Ver no mapa</Button></div>
    <div className="content-split">
      <Card title="Próximas de você">
        <div className="offer-list">
          {[
            ["BP","Bike Point Performance","0,9 km · Especializada em MTB e suspensão"],
            ["VC","Velo Care Oficina","2,4 km · Revisões, freios e transmissão"],
            ["TR","Trail Repair","3,1 km · E-bikes e componentes eletrônicos"]
          ].map(([tag,title,text]) => <article className="offer" key={title}><div className="offer__tag">{tag}</div><div><strong>{title}</strong><span>{text}</span><small className="green-text">4,9 ★</small></div><Button>Agendar</Button></article>)}
        </div>
      </Card>
      <Card title="Filtros rápidos"><div className="tags"><span>MTB</span><span>Speed</span><span>Suspensão</span><span>E-bike</span><span>Freios</span><span>Bike fit</span></div><Button full variant="secondary">Aplicar filtros</Button></Card>
    </div>
  </div>
}

export function Marketplace() {
  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Marketplace</h1><p>Produtos, serviços e experiências do mundo do ciclismo.</p></div><Button variant="secondary">Carrinho · 2</Button></div>
    <div className="product-grid">
      {[
        ["shield","Capacete MTB Pro","Proteção premium com excelente ventilação.","R$ 599,90"],
        ["route","Pneu 29 x 2.25","Excelente tração em trilhas secas e mistas.","R$ 289,90"],
        ["link","Corrente 12 velocidades","Alta durabilidade e troca precisa.","R$ 349,90"],
        ["tool","Revisão completa","Agende em uma oficina parceira próxima.","A partir de R$ 280"]
      ].map(([icon,title,text,price]) => <Card className="product-card" key={title}><div className="product-card__visual"><Icon name={icon as any}/></div><span className="badge badge--green">Compatível</span><h3>{title}</h3><p>{text}</p><strong>{price}</strong></Card>)}
    </div>
  </div>
}

export function Events() {
  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Eventos</h1><p>Pedais, provas, workshops e experiências da comunidade.</p></div><Button>Criar evento</Button></div>
    <Card title="Próximos eventos">
      <div className="offer-list">
        {[
          ["12 AGO","Pedal da Serra","Xaxim · SC · 62 km · MTB"],
          ["24 AGO","Workshop de manutenção","Oficina Bike Point · 19h"],
          ["07 SET","Desafio Gravel Oeste","Chapecó · SC · 85 km"]
        ].map(([tag,title,text]) => <article className="offer" key={title}><div className="offer__tag">{tag}</div><div><strong>{title}</strong><span>{text}</span></div><Button>Participar</Button></article>)}
      </div>
    </Card>
  </div>
}

export function Stations() {
  return <div className="page">
    <div className="page-heading page-heading--with-action"><div><h1>Estações</h1><p>Localize, reserve e acompanhe estações inteligentes.</p></div><Button>Reservar estação</Button></div>
    <div className="content-split">
      <div className="map-mock"><i className="map-pin map-pin--1">1</i><i className="map-pin map-pin--2">2</i><i className="map-pin map-pin--3">3</i></div>
      <Card title="Mais próximas"><div className="list">{["Estação Centro · 0,8 km","Estação Norte · 2,1 km","Estação Parque · 3,4 km"].map((item)=><div className="list-row" key={item}><Icon name="pin"/><div><strong>{item}</strong><span>Disponível agora</span></div><span className="badge badge--green">Livre</span></div>)}</div></Card>
    </div>
  </div>
}

export function Notifications() {
  return <div className="page"><div className="page-heading page-heading--with-action"><div><h1>Notificações</h1><p>Atualizações importantes da sua conta e bicicleta.</p></div><Button variant="secondary">Marcar todas como lidas</Button></div>
    <div className="notice-list">
      {[
        ["tool","Manutenção se aproximando","Faltam aproximadamente 250 km para a próxima revisão geral."],
        ["gift","Novo benefício disponível","Você recebeu 20% de desconto em componentes selecionados."],
        ["calendar","Evento confirmado","Sua participação no Pedal da Serra foi confirmada."]
      ].map(([icon,title,text],i)=><article className={`notice ${i<2?"notice--unread":""}`} key={title}><div className="notice__icon"><Icon name={icon as any}/></div><div><strong>{title}</strong><p>{text}</p><small>{i===0?"Há 20 minutos":i===1?"Hoje, 09:10":"Ontem"}</small></div></article>)}
    </div>
  </div>
}

export function Profile() {
  return <div className="page"><div className="page-heading page-heading--with-action"><div><h1>Perfil</h1><p>Gerencie suas informações e preferências.</p></div><Button>Salvar alterações</Button></div>
    <div className="profile-grid">
      <Card className="profile-card"><div className="profile-avatar">JI</div><h2>Jhonatan Ilha</h2><p>Membro desde maio de 2025</p><div className="tags"><span>MTB</span><span>Intermediário</span><span>Nível 2</span></div></Card>
      <Card title="Dados pessoais"><div className="form-grid">{[["Nome completo","Jhonatan Ilha"],["E-mail","jhonatan@bikehub.com"],["Telefone","(49) 99999-9999"],["Cidade","Xaxim - SC"]].map(([label,value])=><label key={label}>{label}<input value={value} readOnly/></label>)}</div></Card>
    </div>
  </div>
}

export function Settings() {
  const rows = [["bell","Notificações de manutenção","Receber lembretes e alertas preventivos"],["gift","Novos benefícios","Receber avisos de cupons e campanhas"],["shield","Compartilhamento de dados","Permitir relatórios agregados e anonimizados"],["settings","Aparência escura","Tema visual padrão do aplicativo"]];
  return <div className="page"><div className="page-heading"><div><h1>Configurações</h1><p>Controle notificações, privacidade e preferências.</p></div></div><div className="settings-list">{rows.map(([icon,title,text],i)=><article className="setting-row" key={title}><Icon name={icon as any}/><div><strong>{title}</strong><span>{text}</span></div><button className={`switch ${i!==2?"is-on":""}`}><i/></button></article>)}</div></div>
}
