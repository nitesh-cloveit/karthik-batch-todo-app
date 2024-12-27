interface CardProps {
  title: string;
  description?: string;
  onDelete: () => void;
}

export default function Card(props: CardProps) {
  return (
    <div className="card">
      <div>
        <h3 className="card-title">{props.title}</h3>
        <p className="card-desc">{props.description}</p>
      </div>
      <div className="card-actions">
        <button>Edit</button>
        <button onClick={props.onDelete}>Delete</button>
      </div>
    </div>
  );
}
