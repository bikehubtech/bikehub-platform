import { gnexisTheme } from "./theme";

export const pwaConfig = {
  name: "Gnexis Platform",
  shortName: "Gnexis",
  description: "Ecossistema digital Gnexis para o mundo do ciclismo.",
  themeColor: gnexisTheme.colors.background,
  backgroundColor: gnexisTheme.colors.background,
  display: "standalone",
} as const;
