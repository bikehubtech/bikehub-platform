export const bikeHubTheme = {
  colors: {
    background: "#0d1117",
    surface: "#1a1f27",
    surfaceElevated: "#2b313a",
    border: "#2b313a",
    text: "#e5e7eb",
    textMuted: "#93a0a4",
    primary: "#8cd700",
    primaryDark: "#4caf00",
    warning: "#ffb020",
  },
} as const;

export type BikeHubTheme = typeof bikeHubTheme;
export type BikeHubColor = keyof BikeHubTheme["colors"];

const cssVariables: Record<BikeHubColor, `--${string}`> = {
  background: "--bg",
  surface: "--surface",
  surfaceElevated: "--surface-2",
  border: "--line",
  text: "--text",
  textMuted: "--muted",
  primary: "--green",
  primaryDark: "--green-dark",
  warning: "--warning",
};

export function applyBikeHubTheme(root: HTMLElement = document.documentElement) {
  for (const [token, variable] of Object.entries(cssVariables)) {
    root.style.setProperty(variable, bikeHubTheme.colors[token as BikeHubColor]);
  }
}
