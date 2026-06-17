import { useParams } from "react-router-dom";
import { substances } from "../data/substances";

// SubstancePage component - displays detailed information about a specific substance
function SubstancePage() {
  // Get the substance ID from the URL parameters
  const { id } = useParams();

  // Find the substance object matching the ID from the URL
  const substance = substances.find(
    (s) => s.id === Number(id)
  );

  // Display error message if substance is not found
  if (!substance) {
    return <h1>Substance not found</h1>;
  }

  // Render detailed substance information
  return (
    <div>
      {/* Substance name */}
      <h1>{substance.name}</h1>

      {/* Category */}
      <p>
        <strong>Category:</strong> {substance.category}
      </p>

      {/* Duration of effects */}
      <p>
        <strong>Duration:</strong> {substance.duration}
      </p>

      {/* Full description */}
      <p>{substance.description}</p>
    </div>
  );
}

export default SubstancePage;