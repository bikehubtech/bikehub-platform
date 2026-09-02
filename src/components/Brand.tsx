export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`}>
      <svg className="brand__mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <path d="M72.98 69.29 A30 30 0 1 1 72.98 30.71" fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
        <path d="M58 50 L78 50" fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
      </svg>
      <span className="brand__word">GNE<em>X</em>IS</span>
    </div>
  );
}
