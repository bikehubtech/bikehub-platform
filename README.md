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
  services/    Integrações externas (Firebase, etc.)
  store/       Contratos de estado global
  styles/      Estilos globais e identidade visual
  types/       Tipos compartilhados
  utils/       Utilitários sem dependência de interface
public/
  assets/      Arquivos estáticos públicos
```

## Firebase (autenticação)

A autenticação (login por e-mail/senha, cadastro e o modo "Entrar como Jhonatan Ilha") é feita com o Firebase Authentication. Sem as variáveis `VITE_FIREBASE_*` configuradas, o app roda em **modo demonstrativo**: qualquer e-mail e senha funcionam, nada é enviado a um servidor, e o comportamento é idêntico ao das versões anteriores — então rodar `npm run dev` sem nenhuma configuração continua funcionando normalmente para quem só quer mexer na interface.

### Ativando a autenticação real

1. Crie um projeto gratuito em [console.firebase.google.com](https://console.firebase.google.com).
2. Em **Authentication → Sign-in method**, ative os provedores **E-mail/senha** e **Anônimo** (o modo "Entrar como Jhonatan Ilha" usa autenticação anônima).
3. Em **Configurações do projeto → Geral**, crie um app da Web e copie os valores de configuração.
4. Copie `.env.example` para `.env` e preencha com esses valores:

```bash
cp .env.example .env
```

5. Rode `npm run dev` normalmente. O aviso na tela de login muda de "Ambiente demonstrativo" para "Autenticação Firebase ativa" quando a configuração é reconhecida.

As variáveis começam com `VITE_`, então são valores públicos de cliente (não são segredos) — é assim que o Firebase Web SDK funciona. `.env` já está no `.gitignore` e nunca deve ser commitado mesmo assim, para manter a configuração de cada ambiente (dev/homologação/produção) independente.

### Testando sem criar um projeto (emulador local)

Para testar o fluxo de autenticação real sem depender de um projeto na nuvem, use o [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite):

```bash
npx firebase-tools emulators:start --only auth --project demo-gnexis
```

E no `.env`, além de qualquer valor (mesmo fictício) nas demais variáveis `VITE_FIREBASE_*`, adicione:

```bash
VITE_FIREBASE_USE_EMULATOR=true
```

Com isso o app conecta no emulador local (`127.0.0.1:9099`) em vez do Firebase real — útil para desenvolvimento e para os próximos passos de integração (Firestore, etc.) sem custos ou dependência de rede.

### Escopo desta fase

Esta etapa cobre apenas autenticação (login, cadastro, sessão e nome de exibição no Perfil). Os demais dados do app (bike, clube, pontos, marketplace, reservas etc.) continuam em estado local do front-end — a persistência real desses dados fica para uma próxima fase, com Firestore.
