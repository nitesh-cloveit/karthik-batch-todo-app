import { useState } from "react";
import { BASE_URL, TOKEN } from "../constants";

interface CardProps {
  id: number;
  title: string;
  description?: string;
  status: boolean;
}

export default function Card(props: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newDescription, setDescription] = useState(props.description);

  // update todo item
  const handleEdit = async () => {
    try {
      await fetch(`${BASE_URL}/todos/${props.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };

  // deletes item from the todos array
  const handleDelete = () => {
    try {
      fetch(`${BASE_URL}/todos/${props.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card">
      {isEditing ? (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", gap: "8px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%", gap: "4px" }}
          >
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="card-actions">
            <button className="save" onClick={handleEdit}>Save</button>
            <button className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", gap: "8px" }}>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", gap: "8px" }}>
            <input style={{ alignSelf: "self-start" }} type="checkbox" defaultChecked={props.status || false} />

            <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "8px" }}>
            <h3 className="card-title">{newTitle}</h3>
            <p className="card-desc">{newDescription}</p>
            </div>
          </div>
          <div className="card-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
