# BikeHub Platform

BikeHub Foundation v1.0: base web do ecossistema BikeHub, reconstruída em React, TypeScript e Vite.

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

## Estrutura

```text
src/
  components/  Componentes reutilizáveis
  layout/      Estrutura global de navegação
  pages/       Telas da plataforma
  services/    Integrações externas futuras
  styles/      Estilos globais e identidade visual
  types/       Tipos compartilhados
public/
  assets/      Arquivos estáticos públicos
```

## Firebase

A configuração futura usa variáveis `VITE_FIREBASE_*`. Copie `.env.example` para um arquivo local de ambiente somente quando a integração for iniciada. Nenhuma integração Firebase está ativa nesta versão.
