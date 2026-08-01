import { useState } from "react";
import { Brand } from "../components/Brand";
import { Button } from "../components/Button";

export function Login({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit() {
    if (email.trim() && password) {
      onSuccess();
      return;
    }
    setError("Preencha o e-mail e a senha.");
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <Brand />
        <h1>Entrar</h1>
        <p>Acesse o ambiente demonstrativo da plataforma.</p>

        <div className="demo-box">
          <strong>Ambiente demonstrativo</strong>
          <span>A autenticação segura será integrada ao Firebase.</span>
          <span>Nenhuma credencial é armazenada no código.</span>
        </div>

        <label>E-mail<input value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Senha<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>

        {error && <div className="form-error">{error}</div>}

        <Button full onClick={submit}>Entrar</Button>
        <Button full variant="secondary" onClick={onBack}>Voltar</Button>
      </section>
    </main>
  );
}
