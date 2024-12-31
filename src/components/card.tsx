import { useState } from "react";

interface CardProps {
  title: string;
  description?: string;
  status: boolean;
  onDelete: () => void;
  onEdit: (updatedTitle: string, updatedDescription?: string) => void;
}

export default function Card(props: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);

  const handleEdit = () => {
    // update todos array with updated todo item
    console.log("Edit", newTitle);
    props.onEdit(newTitle);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <div>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          {/* <input value={props.description} /> */}
          <button onClick={() => handleEdit()}>Save</button>
        </div>
      ) : (
        <div>
            <input type="checkbox" defaultChecked={props.status} />
          <div>
            <h3 className="card-title">{props.title}</h3>
            <p className="card-desc">{props.description}</p>
          </div>
          <div className="card-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={props.onDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
