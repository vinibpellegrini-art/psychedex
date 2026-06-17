import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  name: string;
  category: string;
  duration: string;
  description: string;
};

function SubstanceCard({
  id,
  name,
  category,
  duration,
  description,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/substance/${id}`)}
      style={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "15px",
        cursor: "pointer",
        backgroundColor: "#fff",
      }}
    >
      <h2>{name}</h2>

      <p>
        <strong>Category:</strong> {category}
      </p>

      <p>
        <strong>Duration:</strong> {duration}
      </p>

      <p>{description}</p>
    </div>
  );
}

export default SubstanceCard;