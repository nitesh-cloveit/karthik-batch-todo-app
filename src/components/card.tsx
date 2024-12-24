interface CardProps {
  title: string;
  description?: string;
}

export default function Card(props: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{props.title}</h3>
      <p className="card-desc">{props.description}</p>
    </div>
  );
}