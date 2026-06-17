import { useParams } from "react-router-dom";
import { substances } from "../data/substances";

function SubstancePage() {
  const { id } = useParams();

  const substance = substances.find(
    (s) => s.id === Number(id)
  );

  if (!substance) {
    return <h1>Substance not found</h1>;
  }

  return (
    <div>
      <h1>{substance.name}</h1>

      <p>
        <strong>Category:</strong> {substance.category}
      </p>

      <p>
        <strong>Duration:</strong> {substance.duration}
      </p>

      <p>{substance.description}</p>
    </div>
  );
}

export default SubstancePage;