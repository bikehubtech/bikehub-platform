import { Brand } from "../components/Brand";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

export function Access({ onEnter, onLogin }: { onEnter: () => void; onLogin: () => void }) {
  return (
    <main className="access">
      <section className="access__content">
        <Brand />
        <div className="access__eyebrow">PLATAFORMA COMPLETA PARA CICLISTAS</div>
        <h1>Tudo que você e sua bike precisam, <em>em um só lugar.</em></h1>
        <p>Organize sua bicicleta, acompanhe manutenções e conecte-se ao ecossistema do ciclismo em uma única experiência digital.</p>
        <div className="access__features">
          <span><Icon name="shield" /> Prontuário digital</span>
          <span><Icon name="gift" /> Benefícios exclusivos</span>
          <span><Icon name="bike" /> Gestão da sua bike</span>
        </div>
        <div className="access__actions">
          <Button onClick={onEnter}>Entrar como Jhonatan Ilha</Button>
          <Button variant="secondary" onClick={onLogin}>Entrar com e-mail</Button>
        </div>
      </section>
      <section className="access__visual">
        <div className="access__sun" />
        <div className="access__mountain access__mountain--back" />
        <div className="access__mountain access__mountain--front" />
        <div className="access__glass">
          <Brand compact />
          <div>
            <strong>Sua jornada começa aqui.</strong>
            <span>Mais organização, cuidado e conexão.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
