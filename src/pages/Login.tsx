import { useState } from "react";
import { Brand } from "../components/Brand";
import { Button } from "../components/Button";
import { useAuth } from "../hooks";

export function Login({ onBack }: { onBack: () => void }) {
  const { signIn, signUp, isConfigured } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setError("");

    if (!email.trim() || !password) {
      setError("Preencha o e-mail e a senha.");
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError("Informe seu nome.");
      return;
    }

    setSubmitting(true);
    const result = mode === "signin" ? await signIn(email.trim(), password) : await signUp(email.trim(), password, name);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <Brand />
        <h1>{mode === "signin" ? "Entrar" : "Criar conta"}</h1>
        <p>Acesse o ambiente da plataforma.</p>

        <div className="demo-box">
          {isConfigured ? (
            <>
              <strong>Autenticação Firebase ativa</strong>
              <span>Seu e-mail e senha são validados com segurança pelo Firebase Authentication.</span>
            </>
          ) : (
            <>
              <strong>Ambiente demonstrativo</strong>
              <span>A integração com Firebase ainda não foi configurada neste ambiente.</span>
              <span>Nenhuma credencial é armazenada — qualquer e-mail e senha funcionam por aqui.</span>
            </>
          )}
        </div>

        {mode === "signup" && (
          <label>Nome<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
        )}
        <label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
        <label>Senha<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} /></label>

        {error && <div className="form-error">{error}</div>}

        <Button full onClick={submit} disabled={submitting}>
          {submitting ? "Enviando..." : mode === "signin" ? "Entrar" : "Criar conta"}
        </Button>
        <button
          type="button"
          className="text-action login-panel__switch"
          onClick={() => {
            setMode((current) => (current === "signin" ? "signup" : "signin"));
            setError("");
          }}
        >
          {mode === "signin" ? "Não tem conta? Criar conta" : "Já tem conta? Entrar"}
        </button>
        <Button full variant="secondary" onClick={onBack}>Voltar</Button>
      </section>
    </main>
  );
}
