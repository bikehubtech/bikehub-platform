export const bikeHubTheme = {
  colors: {
    background: "#050b0e",
    surface: "#0b1519",
    surfaceElevated: "#111d22",
    border: "#26363b",
    text: "#f6f7f5",
    textMuted: "#93a0a4",
    primary: "#9be318",
    primaryDark: "#79c20e",
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
