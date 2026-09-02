import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";
import { StatCard } from "../components/StatCard";

const activities = [
  ["drop", "Lavagem realizada", "Gnexis Vila Madalena", "Hoje, 09:15", "Concluída"],
  ["tool", "Manutenção registrada", "Troca de corrente e lubrificação", "Ontem, 16:40", "Concluída"],
  ["route", "Pedal registrado", "Pedal do Vale · 45,7 km", "18/05/2025", ""],
  ["star", "Você ganhou 100 pontos", "Por manter suas manutenções em dia", "18/05/2025", "+100 pts"],
] as const;

const performancePoints = "0,75 24,102 48,118 72,92 96,82 120,104 144,92 168,112 192,78 216,55 240,70 264,82 288,86 312,60 336,48 360,70 384,58 408,24 432,24";

export function Dashboard({ onOpenBike, onOpenStations, onOpenBenefits }: {
  onOpenBike: () => void;
  onOpenStations: () => void;
  onOpenBenefits: () => void;
}) {
  return (
    <div className="page dashboard-page">
      <div className="page-heading dashboard-heading">
        <div><h1>Olá, Jhonatan Ilha! <span>👋</span></h1><p>Tudo o que você precisa para viver o ciclismo ao máximo.</p></div>
      </div>

      <section className="stats-grid dashboard-stats">
        <StatCard icon="drop" label="Lavagens este mês" value="3/5" note="Plano PRO · Próxima lavagem disponível" progress={67} />
        <StatCard icon="tool" label="Manutenções em dia" value="2/2" note="Tudo certo com sua bike!" progress={100} />
        <article className="stat-card stat-card--combined">
          <Icon name="route" />
          <div className="stat-card__body">
            <span>Pedal total (mês)</span>
            <strong>325 <small>km</small></strong>
            <em>↑ 18% <span>vs mês anterior</span></em>
          </div>
          <div className="points-summary">
            <Icon name="star" />
            <strong>1.250 <small>pts</small></strong>
            <span>Nível 2</span>
            <div className="progress"><i style={{ width: "69%" }} /></div>
            <small>Próximo nível: 1.800 pts</small>
          </div>
        </article>
      </section>

      <section className="dashboard-grid">
        <Card className="activity-card" title="Atividade recente" action={<button className="text-action">Ver todas</button>}>
          <div className="activity-list">
            {activities.map(([icon, title, subtitle, date, status]) => (
              <div className="activity-row" key={title}>
                <Icon name={icon} />
                <div><strong>{title}</strong><span>{subtitle}</span></div>
                <small>{date}{status && <em>{status}</em>}</small>
                {!status && <Icon name="chevron" />}
              </div>
            ))}
          </div>
        </Card>

        <Card className="performance-card" title="Seu desempenho" action={<button className="text-action">Ver detalhes</button>}>
          <div className="chart-tabs"><span>Semana</span><strong>Mês</strong><span>Ano</span></div>
          <div className="metric-strip">
            <span><small>Distância</small><strong>325 km</strong></span>
            <span><small>Tempo</small><strong>14h 32m</strong></span>
            <span><small>Elevação</small><strong>2.450 m</strong></span>
          </div>
          <div className="line-chart" aria-label="Desempenho mensal de distância">
            <svg viewBox="0 0 432 140" role="img">
              <defs>
                <linearGradient id="performance-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#9be318" stopOpacity=".42" />
                  <stop offset="1" stopColor="#9be318" stopOpacity=".03" />
                </linearGradient>
              </defs>
              {[20, 50, 80, 110, 138].map((y) => <line key={y} x1="0" y1={y} x2="432" y2={y} />)}
              {[0, 88, 176, 264, 352, 432].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="140" />)}
              <polygon points={`0,140 ${performancePoints} 432,140`} fill="url(#performance-fill)" />
              <polyline className="chart-line" points={performancePoints} />
            </svg>
            <div className="chart-dates"><span>1 Mai</span><span>8 Mai</span><span>15 Mai</span><span>22 Mai</span><span>31 Mai</span></div>
          </div>
        </Card>

        <Card className="bike-summary-card" title="Minha bike" action={<button className="bike-card-chevron" onClick={onOpenBike}>⌄</button>}>
          <div className="bike-product-visual"><img src="/assets/dashboard-bike.png" alt="Specialized Epic Comp 2021" /></div>
          <div className="bike-title-row"><h3>Specialized Epic Comp 2021</h3><span className="badge badge--green">Principal</span></div>
          <div className="bike-specs"><span><Icon name="bike" />MTB</span><span><Icon name="link" />Carbono</span><span><Icon name="clock" />29”</span><span><Icon name="tool" />11,2 kg</span></div>
          <div className="bike-status"><strong>✓</strong><div><b>Tudo certo com sua bike</b><small>Última atualização: 17/05/2025</small></div></div>
        </Card>

        <Card className="recommendations-card" title="Recomendado para você" action={<div className="carousel-actions"><button>‹</button><button>›</button></div>}>
          <div className="recommendations">
            <article className="recommendation recommendation--purple"><strong>15% OFF</strong><span>em acessórios</span><button>Ver cupom</button></article>
            <article className="recommendation recommendation--blue"><strong>Checklist pré-pedal</strong><span>Cuide da sua bike antes da aventura.</span><button>Ver checklist</button></article>
            <article className="recommendation recommendation--green"><strong>Treino sugerido</strong><span>Base endurance · 60–90 min.</span><button>Iniciar treino</button></article>
          </div>
        </Card>

        <Card className="stations-card" title="Estações próximas" action={<button className="text-action" onClick={onOpenStations}>Ver todas</button>}>
          <div className="station-highlight"><Icon name="pin" /><div><strong>Gnexis Vila Madalena</strong><span>Rua Harmonia, 123 · São Paulo, SP</span><b>Aberta · 24h</b></div><em>0,8 km</em></div>
        </Card>

        <Card className="event-card" title="Próximo evento" action={<button className="text-action">Ver todos</button>}>
          <div className="event-preview"><img src="/assets/dashboard-event.jpg" alt="Ciclistas no Pedal do Vale" /><div><h3>Pedal do Vale</h3><span>♧ 25 de Maio · 08:00</span><span>⌖ São José dos Campos · SP</span><Button variant="ghost">Ver detalhes</Button></div></div>
        </Card>

        <Card className="benefits-card" title="Seus benefícios" action={<button className="text-action" onClick={onOpenBenefits}>Ver todos</button>}>
          <div className="benefit-highlight"><div className="benefit-icon"><Icon name="bike" /></div><div><strong>20% OFF em peças Shimano</strong><span>Válido até 31/05/2025</span></div><b>SHIMANO</b></div>
        </Card>
      </section>
      <div className="dashboard-dots"><i /><i /><i /><i /></div>
    </div>
  );
}
