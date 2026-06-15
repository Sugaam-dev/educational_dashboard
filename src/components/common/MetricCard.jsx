function toneClass(tone) {
  return `tone-${tone}`;
}

export default function MetricCard({ label, value, note, tone, small }) {
  return (
    <article className={`metric-card ${small ? 'small' : ''}`}>
      <span>{label}</span>
      <strong className={toneClass(tone)}>{value}</strong>
      <p>{note}</p>
    </article>
  );
}
