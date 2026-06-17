import { useState } from "react";
import { substances } from "../data/substances";
import SubstanceCard from "../components/SubstanceCard";

// HomePage component - main page displaying all substances with search functionality
function HomePage() {
  // State for search input
  const [search, setSearch] = useState("");

  // Filter substances based on search input (case-insensitive)
  const filteredSubstances = substances.filter((substance) =>
    substance.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Page title */}
      <h1>Psychedex</h1>

      {/* Search input field */}
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

      {/* Grid container displaying substance cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {/* Map through filtered substances and render a card for each */}
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