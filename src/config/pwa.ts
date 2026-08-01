import { bikeHubTheme } from "./theme";

export const pwaConfig = {
  name: "BikeHub Platform",
  shortName: "BikeHub",
  description: "Ecossistema digital BikeHub para ciclistas.",
  themeColor: bikeHubTheme.colors.background,
  backgroundColor: bikeHubTheme.colors.background,
  display: "standalone",
} as const;
