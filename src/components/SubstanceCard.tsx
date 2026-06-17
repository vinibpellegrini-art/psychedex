import { useNavigate } from "react-router-dom";

// Props interface for SubstanceCard component
type Props = {
  id: number;
  name: string;
  category: string;
  duration: string;
  description: string;
};

// SubstanceCard component - displays a clickable card for a single substance
// Navigates to the detailed substance page when clicked
function SubstanceCard({
  id,
  name,
  category,
  duration,
  description,
}: Props) {
  // Hook to navigate to different routes
  const navigate = useNavigate();

  return (
    // Card container with click handler to navigate to substance details
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
      {/* Substance name */}
      <h2>{name}</h2>

      {/* Category information */}
      <p>
        <strong>Category:</strong> {category}
      </p>

      {/* Duration of effects */}
      <p>
        <strong>Duration:</strong> {duration}
      </p>

      {/* Brief description */}
      <p>{description}</p>
    </div>
  );
}

export default SubstanceCard;