import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";

const tabs = ["Resumo", "Manutenções", "Componentes", "Evolução", "Configurações"];

export function Bike() {
  const [activeTab, setActiveTab] = useState("Resumo");

  return (
    <div className="page">
      <div className="page-heading page-heading--with-action">
        <div><h1>Minha Bike</h1><p>Resumo técnico e histórico da sua bicicleta principal.</p></div>
        <Button variant="secondary">+ Adicionar bike</Button>
      </div>

      <div className="tabs">
        {tabs.map((tab) => <button key={tab} className={activeTab === tab ? "is-active" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}
      </div>

      {activeTab !== "Resumo" ? (
        <div className="locked-view">
          <Icon name="shield" />
          <h2>{activeTab}</h2>
          <p>Esta seção está preparada para a próxima fase do desenvolvimento.</p>
          <Button variant="secondary" onClick={() => setActiveTab("Resumo")}>Voltar ao resumo</Button>
        </div>
      ) : (
        <div className="bike-layout">
          <div className="bike-main-column">
            <Card>
              <div className="bike-profile-header">
                <div>
                  <span className="badge badge--purple">Principal</span>
                  <h2>Specialized Epic Comp 2021</h2>
                  <div className="tags"><span>MTB</span><span>Carbono</span><span>29”</span><span>11,2 kg</span></div>
                </div>
                <Button variant="secondary">Editar bike</Button>
              </div>
              <div className="bike-large-visual"><Icon name="bike" /></div>
              <div className="status-ok">✓ Tudo certo com sua bike</div>
              <small>Última atualização: 17/05/2025</small>
            </Card>

            <Card title="Estatísticas da bike">
              <div className="bike-metrics">
                <div><Icon name="route" /><strong>325 km</strong><span>Distância total</span></div>
                <div><Icon name="clock" /><strong>14h 32m</strong><span>Tempo total</span></div>
                <div><Icon name="mountain" /><strong>2.450 m</strong><span>Elevação acumulada</span></div>
                <div><Icon name="bike" /><strong>18</strong><span>Pedais realizados</span></div>
                <div><Icon name="flame" /><strong>7.250 kcal</strong><span>Calorias gastas</span></div>
              </div>
            </Card>

            <Card title="Histórico de manutenções" action={<button className="text-action">Ver todas</button>}>
              <div className="list">
                {[
                  ["Revisão geral","Troca de corrente, lubrificação e ajustes","17/01/2025"],
                  ["Suspensão","Manutenção preventiva","10/11/2024"],
                  ["Freios","Troca de pastilhas e sangria","05/10/2024"]
                ].map(([a,b,c]) => <div className="list-row" key={a}><Icon name="tool" /><div><strong>{a}</strong><span>{b}</span></div><small>{c}</small></div>)}
              </div>
            </Card>
          </div>

          <aside className="bike-side-column">
            <Card title="Próxima manutenção" action={<button className="text-action">Ver todas</button>}>
              <div className="list-row"><Icon name="tool" /><div><strong>Revisão geral</strong><span>A cada 6 meses ou 800 km</span></div></div>
              <div className="maintenance-summary"><span>Faltam<strong>250 km</strong></span><span>Prazo<strong>45 dias</strong></span></div>
              <div className="progress"><i style={{ width: "68%" }} /></div>
              <Button full>Agendar manutenção</Button>
            </Card>

            <Card title="Componentes e consumíveis" action={<button className="text-action">Ver todos</button>}>
              <div className="component-list">
                {[
                  ["link","Corrente","Shimano XT M8100","Bom","65%"],
                  ["route","Pneus","Maxxis Rekon Race","Atenção","40%"],
                  ["tool","Pastilhas de freio","Shimano XT","Bom","70%"],
                  ["settings","Relação","Shimano XT 12v","Bom","80%"]
                ].map(([icon,a,b,c,d]) => <div className="component-row" key={a}><Icon name={icon as any}/><div><strong>{a}</strong><span>{b}</span></div><em className={c==="Atenção"?"warning":""}>{c}</em><small>{d}</small></div>)}
              </div>
            </Card>

            <Card title="Documentos da bike">
              <div className="list">
                {["Nota fiscal","Manual do fabricante","Certificado de garantia"].map((item) => <div className="list-row" key={item}><Icon name="file"/><div><strong>{item}</strong></div><Icon name="chevron"/></div>)}
              </div>
              <Button full variant="secondary">+ Adicionar documento</Button>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}
