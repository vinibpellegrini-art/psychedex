import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Props interface for the SubstanceCard component.
// Accepts a PubChem CID so the component can render a molecular structure image.
type Props = {
  id: number;
  name: string;
  category: string;
  duration: string;
  description: string;
  cid?: number;
};

// SubstanceCard component - displays a clickable card for a single substance
// Navigates to the detailed substance page when clicked
function SubstanceCard({
  id,
  name,
  category,
  duration,
  description,
  cid,
}: Props) {
  // Hook to navigate to the substance detail page on card click.
  const navigate = useNavigate();
  
  // State to track if the image failed to load
  const [imageError, setImageError] = useState(false);

  // Build the PubChem image URL from the CID if one is available.
  const imageUrl = cid
    ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=250x250`
    : null;

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
      {/* Render the PubChem structure image when a CID is available. */}
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={`${name} structure`}
          onError={() => setImageError(true)}
          style={{
            width: "100%",
            maxHeight: "180px",
            objectFit: "contain",
            marginBottom: "15px",
          }}
        />
      ) : (
        <img
          src={new URL("../assets/notfound.png", import.meta.url).href}
          alt="Structure not available"
          style={{
            width: "100%",
            maxHeight: "180px",
            objectFit: "contain",
            marginBottom: "15px",
          }}
        />
      )}

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