import { useState } from "react";
import { substances } from "../data/substances";
import SubstanceCard from "../components/SubstanceCard";

function HomePage() {
  const [search, setSearch] = useState("");

  const filteredSubstances = substances.filter((substance) =>
    substance.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Psychedex</h1>

      <input
        type="text"
        placeholder="Search substances..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {filteredSubstances.map((substance) => (
          <SubstanceCard
            key={substance.id}
            id={substance.id}
            name={substance.name}
            category={substance.category}
            duration={substance.duration}
            description={substance.description}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;