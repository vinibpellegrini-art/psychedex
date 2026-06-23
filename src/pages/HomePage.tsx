import { useEffect, useState } from "react";
import { supabase, type Substance } from "../lib/supabase";
import SubstanceCard from "../components/SubstanceCard";

// HomePage component - main page displaying all substances with search and
// category filtering. Data is loaded from the Supabase `substances_view` view.
function HomePage() {
  // State for the search input value entered by the user.
  const [search, setSearch] = useState("");
  // Currently selected category filter ("" means all categories).
  const [category, setCategory] = useState("");
  // List of available category names for the dropdown.
  const [categories, setCategories] = useState<string[]>([]);
  // Substances loaded from the database.
  const [substances, setSubstances] = useState<Substance[]>([]);
  // Loading / error UI state for the async fetch.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load the list of categories once on mount to populate the dropdown.
  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("name")
        .order("name");

      if (cancelled || error || !data) return;
      setCategories(data.map((c) => c.name));
    }

    loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch substances whenever the search term or selected category changes.
  // Both filters are pushed to the database.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      let query = supabase.from("substances_view").select("*").order("id");
      if (search.trim()) {
        query = query.ilike("name", `%${search.trim()}%`);
      }
      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (cancelled) return;
      if (error) {
        setError(error.message);
        setSubstances([]);
      } else {
        setSubstances(data ?? []);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [search, category]);

  const filtering = search.trim() !== "" || category !== "";

  return (
    <div>
      {/* Sticky top bar with logo, search, and category filter */}
      <header className="topbar">
        <img
          className="topbar__logo"
          src={new URL("../assets/logofinal.png", import.meta.url).href}
          alt="Psychedex"
        />

        <div className="controls">
          {/* Search input with icon */}
          <div className="search">
            <svg
              className="search__icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="input"
              type="text"
              placeholder="Search substances..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category filter dropdown */}
          <select
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Result count */}
      {!loading && !error && (
        <p className="count">
          {substances.length} substance{substances.length === 1 ? "" : "s"}
          {filtering ? " match your filters" : ""}
        </p>
      )}

      {/* Error / empty states */}
      {error && (
        <p className="state state--error">Failed to load substances: {error}</p>
      )}
      {!loading && !error && substances.length === 0 && (
        <p className="state">No substances match your search.</p>
      )}

      {/* Grid of cards (or shimmer skeletons while loading) */}
      <div className="grid">
        {loading
          ? Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="skeleton" />
            ))
          : substances.map((substance) => (
              <SubstanceCard
                key={substance.id}
                id={substance.id}
                name={substance.name}
                category={substance.category}
                duration={substance.duration}
                description={substance.description}
                cid={substance.pubchem_cid ?? undefined}
              />
            ))}
      </div>
    </div>
  );
}

export default HomePage;
