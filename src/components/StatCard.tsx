import { Icon } from "./Icon";

export function StatCard({
  icon,
  label,
  value,
  note,
  progress,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  value: string;
  note: string;
  progress?: number;
}) {
  return (
    <article className="stat-card">
      <Icon name={icon} />
      <div className="stat-card__body">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{note}</small>
        {typeof progress === "number" && (
          <div className="progress"><i style={{ width: `${progress}%` }} /></div>
        )}
      </div>
    </article>
  );
}
