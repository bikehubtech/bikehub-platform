import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";
import { StatCard } from "../components/StatCard";

const activities = [
  ["drop", "Lavagem realizada", "Estação Centro", "Hoje, 09:15"],
  ["tool", "Manutenção registrada", "Troca de corrente e lubrificação", "Ontem"],
  ["route", "Pedal registrado", "Pedal do Vale · 45,7 km", "18/05/2025"],
  ["star", "Você ganhou 100 pontos", "Por manter suas manutenções em dia", "18/05/2025"],
] as const;

export function Dashboard({ onOpenBike, onOpenStations, onOpenBenefits }: {
  onOpenBike: () => void;
  onOpenStations: () => void;
  onOpenBenefits: () => void;
}) {
  const bars = [30,22,37,31,49,43,57,48,64,80,75,84];
  return (
    <div className="page">
      <div className="page-heading">
        <div><h1>Olá, Jhonatan! 👋</h1><p>Tudo o que você precisa para viver o ciclismo ao máximo.</p></div>
      </div>

      <section className="stats-grid">
        <StatCard icon="drop" label="Lavagens este mês" value="3/5" note="Plano PRO" progress={60} />
        <StatCard icon="tool" label="Manutenções em dia" value="2/2" note="Tudo certo com sua bike!" progress={100} />
        <StatCard icon="route" label="Pedal total (mês)" value="325 km" note="+18% vs. mês anterior" progress={78} />
        <StatCard icon="star" label="Pontos" value="1.250 pts" note="Próximo nível: 1.800 pts" progress={69} />
      </section>

      <section className="dashboard-grid">
        <Card title="Atividade recente" action={<button className="text-action">Ver todas</button>}>
          <div className="list">
            {activities.map(([icon, title, subtitle, date]) => (
              <div className="list-row" key={title}>
                <Icon name={icon} />
                <div><strong>{title}</strong><span>{subtitle}</span></div>
                <small>{date}</small>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Seu desempenho" action={<button className="text-action">Ver detalhes</button>}>
          <div className="metric-strip">
            <span><strong>325 km</strong>Distância</span>
            <span><strong>14h 32m</strong>Tempo</span>
            <span><strong>2.450 m</strong>Elevação</span>
          </div>
          <div className="bar-chart">
            {bars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
          </div>
        </Card>

        <Card className="bike-summary-card" title="Minha bike" action={<button className="text-action" onClick={onOpenBike}>Abrir</button>}>
          <div className="bike-hero-icon"><Icon name="bike" /></div>
          <h3>Specialized Epic Comp 2021</h3>
          <div className="tags"><span>MTB</span><span>Carbono</span><span>29”</span><span>11,2 kg</span></div>
          <div className="status-ok">✓ Tudo certo com sua bike</div>
          <Button full onClick={onOpenBike}>Ver Minha Bike</Button>
        </Card>

        <Card title="Recomendado para você">
          <div className="recommendations">
            <article className="recommendation recommendation--purple"><strong>15% OFF</strong><span>em acessórios</span><button>Ver cupom</button></article>
            <article className="recommendation recommendation--blue"><strong>Checklist pré-pedal</strong><span>Cuide da sua bike antes da aventura.</span><button>Ver checklist</button></article>
            <article className="recommendation recommendation--green"><strong>Treino sugerido</strong><span>Base endurance · 60–90 min.</span><button>Iniciar treino</button></article>
          </div>
        </Card>

        <Card title="Estações próximas" action={<button className="text-action" onClick={onOpenStations}>Ver todas</button>}>
          <div className="list">
            {["Estação Centro · 0,8 km","Estação Norte · 2,1 km","Estação Parque · 3,4 km"].map((item) => (
              <div className="list-row" key={item}><Icon name="pin" /><div><strong>{item}</strong><span className="green-text">Aberta · 24h</span></div></div>
            ))}
          </div>
        </Card>

        <Card title="Seus benefícios" action={<button className="text-action" onClick={onOpenBenefits}>Ver todos</button>}>
          <div className="list">
            {["20% OFF em peças","10% OFF em toda loja","R$ 20 OFF na lavagem"].map((item) => (
              <div className="list-row" key={item}><Icon name="gift" /><div><strong>{item}</strong></div><Icon name="chevron" /></div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
