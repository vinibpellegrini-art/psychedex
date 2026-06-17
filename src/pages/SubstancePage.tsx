import { useParams } from "react-router-dom";
import { substances, substanceCIDMap } from "../data/substances";

// SubstancePage component - displays detailed information for one substance.
function SubstancePage() {
  // Get the substance ID from the route parameters.
  const { id } = useParams();

  // Find the substance object in the data list by ID.
  const substance = substances.find(
    (s) => s.id === Number(id)
  );

  // Display error message if substance is not found
  if (!substance) {
    return <h1>Substance not found</h1>;
  }

  // Look up the PubChem CID for the selected substance.
  const cid = substanceCIDMap[substance.id];
  const imageUrl = cid
    ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=350x350`
    : null;

  // Render detailed substance information with the molecular image above the name.
  return (
    <div style={{ padding: "20px" }}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${substance.name} structure`}
          style={{
            width: "100%",
            maxWidth: "360px",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />
      )}
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