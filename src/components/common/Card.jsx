export default function Card({ title, children, className = '', style = {} }) {
  return (
    <section className={`card ${className}`} style={style}>
      {title && <h3>{title}</h3>}
      {children}
    </section>
  );
}

