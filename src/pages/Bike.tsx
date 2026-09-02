import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";
import { useToast } from "../hooks";

const tabs = ["Resumo", "Manutenções", "Componentes", "Evolução", "Configurações"];

const maintenanceHistory = [
  ["Revisão geral", "Troca de corrente, lubrificação e ajustes", "17/01/2025"],
  ["Suspensão", "Manutenção preventiva", "10/11/2024"],
  ["Freios", "Troca de pastilhas e sangria", "05/10/2024"],
];

const moreMaintenanceHistory = [
  ["Pneus", "Troca do par dianteiro e traseiro", "22/08/2024"],
  ["Transmissão", "Limpeza e ajuste de câmbio", "14/06/2024"],
];

const componentList = [
  ["link", "Corrente", "Shimano XT M8100", "Bom", "65%"],
  ["route", "Pneus", "Maxxis Rekon Race", "Atenção", "40%"],
  ["tool", "Pastilhas de freio", "Shimano XT", "Bom", "70%"],
  ["settings", "Relação", "Shimano XT 12v", "Bom", "80%"],
];

const moreComponents = [
  ["link", "Cabos e capas", "Shimano padrão", "Bom", "75%"],
  ["route", "Câmara de ar", "Sobressalente", "Bom", "100%"],
];

export function Bike() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("Resumo");
  const [bikeName, setBikeName] = useState("Specialized Epic Comp 2021");
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(bikeName);
  const [maintenanceScheduled, setMaintenanceScheduled] = useState(false);
  const [maintenanceExpanded, setMaintenanceExpanded] = useState(false);
  const [componentsExpanded, setComponentsExpanded] = useState(false);
  const [documents, setDocuments] = useState(["Nota fiscal", "Manual do fabricante", "Certificado de garantia"]);

  function startEditingName() {
    setNameDraft(bikeName);
    setEditingName(true);
  }

  function saveName() {
    const trimmed = nameDraft.trim();
    if (trimmed) {
      setBikeName(trimmed);
      showToast("Bike atualizada.");
    }
    setEditingName(false);
  }

  function addDocument() {
    setDocuments((current) => [...current, `Novo documento ${current.length + 1}.pdf`]);
  }

  function scheduleMaintenance() {
    setMaintenanceScheduled(true);
    showToast("Manutenção agendada com sucesso.");
  }

  return (
    <div className="page">
      <div className="page-heading page-heading--with-action">
        <div><h1>Minha Bike</h1><p>Resumo técnico e histórico da sua bicicleta principal.</p></div>
        <Button variant="secondary" onClick={() => showToast("Suporte a múltiplas bikes chega em breve.")}>+ Adicionar bike</Button>
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
                  {editingName ? (
                    <div className="inline-edit">
                      <input className="inline-edit-input" value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} autoFocus />
                      <button className="text-action" onClick={saveName}>Salvar</button>
                    </div>
                  ) : (
                    <h2>{bikeName}</h2>
                  )}
                  <div className="tags"><span>MTB</span><span>Carbono</span><span>29”</span><span>11,2 kg</span></div>
                </div>
                <Button variant="secondary" onClick={editingName ? saveName : startEditingName}>{editingName ? "Salvar nome" : "Editar bike"}</Button>
              </div>
              <div className="bike-large-visual"><img src="/assets/dashboard-bike.png" alt={bikeName} /></div>
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

            <Card title="Histórico de manutenções" action={<button className="text-action" onClick={() => setMaintenanceExpanded((v) => !v)}>{maintenanceExpanded ? "Ver menos" : "Ver todas"}</button>}>
              <div className="list">
                {(maintenanceExpanded ? [...maintenanceHistory, ...moreMaintenanceHistory] : maintenanceHistory).map(([a, b, c]) => (
                  <div className="list-row" key={a + c}><Icon name="tool" /><div><strong>{a}</strong><span>{b}</span></div><small>{c}</small></div>
                ))}
              </div>
            </Card>
          </div>

          <aside className="bike-side-column">
            <Card title="Próxima manutenção" action={<button className="text-action" onClick={() => setMaintenanceExpanded((v) => !v)}>{maintenanceExpanded ? "Ver menos" : "Ver todas"}</button>}>
              <div className="list-row"><Icon name="tool" /><div><strong>Revisão geral</strong><span>A cada 6 meses ou 800 km</span></div></div>
              <div className="maintenance-summary"><span>Faltam<strong>{maintenanceScheduled ? "0 km" : "250 km"}</strong></span><span>Prazo<strong>{maintenanceScheduled ? "Agendada" : "45 dias"}</strong></span></div>
              <div className="progress"><i style={{ width: maintenanceScheduled ? "100%" : "68%" }} /></div>
              <Button full disabled={maintenanceScheduled} onClick={scheduleMaintenance}>{maintenanceScheduled ? "Agendada ✓" : "Agendar manutenção"}</Button>
            </Card>

            <Card title="Componentes e consumíveis" action={<button className="text-action" onClick={() => setComponentsExpanded((v) => !v)}>{componentsExpanded ? "Ver menos" : "Ver todos"}</button>}>
              <div className="component-list">
                {(componentsExpanded ? [...componentList, ...moreComponents] : componentList).map(([icon, a, b, c, d]) => (
                  <div className="component-row" key={a}><Icon name={icon as any} /><div><strong>{a}</strong><span>{b}</span></div><em className={c === "Atenção" ? "warning" : ""}>{c}</em><small>{d}</small></div>
                ))}
              </div>
            </Card>

            <Card title="Documentos da bike">
              <div className="list">
                {documents.map((item, i) => <div className="list-row" key={`${item}-${i}`}><Icon name="file" /><div><strong>{item}</strong></div><Icon name="chevron" /></div>)}
              </div>
              <Button full variant="secondary" onClick={addDocument}>+ Adicionar documento</Button>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}
