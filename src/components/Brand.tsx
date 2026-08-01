export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`}>
      <img src="/assets/bikehub-brand.png" alt="BikeHub" />
    </div>
  );
}
