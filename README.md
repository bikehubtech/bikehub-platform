# Gnexis Platform

Gnexis Foundation v1.0: base web do ecossistema Gnexis, reconstruída em React, TypeScript e Vite.

## Requisitos

- Node.js 20
- npm 10 ou superior

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run typecheck
npm run build
```

O build de produção é gerado em `dist/` e está configurado para publicação no Netlify.

## Fluxo de entrega

```text
GitHub → Codex → Commit → Push → Netlify Deploy Automático
```

1. O GitHub mantém a fonte oficial do projeto.
2. O Codex trabalha em uma branch dedicada e valida as alterações localmente.
3. As alterações aprovadas são registradas em commits organizados.
4. A branch é enviada ao GitHub por push.
5. O Netlify executa automaticamente `npm run build` e publica o diretório `dist/`, conforme a configuração do ambiente conectado.

Não é necessário enviar arquivos manualmente ao GitHub ou ao Netlify.

## Estrutura

```text
src/
  config/      Tema e configuração de integrações
  components/  Componentes reutilizáveis
  contexts/    Contextos React compartilhados
  hooks/       Hooks de domínio e integração
  layout/      Estrutura global de navegação
  pages/       Telas da plataforma
  routes/      Metadados e organização da navegação
  services/    Integrações externas futuras
  store/       Contratos de estado global
  styles/      Estilos globais e identidade visual
  types/       Tipos compartilhados
  utils/       Utilitários sem dependência de interface
public/
  assets/      Arquivos estáticos públicos
```

## Firebase

A configuração futura usa variáveis `VITE_FIREBASE_*`. Copie `.env.example` para um arquivo local de ambiente somente quando a integração for iniciada. Nenhuma integração Firebase está ativa nesta versão.
