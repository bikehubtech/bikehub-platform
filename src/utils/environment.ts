type EnvironmentKey = keyof ImportMetaEnv;

export function readEnvironmentValue(key: EnvironmentKey) {
  const value = import.meta.env[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
