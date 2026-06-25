import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HomePage from "./pages/HomePage";
import SubstancePage from "./pages/SubstancePage";
import Sidebar from "./components/Sidebar";
import Background from "./components/Background";
import { CombosProvider, useCombos } from "./context/CombosContext";
import "./App.css";

// Floating launcher button that opens the interaction-checker sidebar and
// shows how many substances are currently selected.
function CombosLauncher() {
  const { t } = useTranslation();
  const { items, open, setOpen } = useCombos();
  if (open) return null;
  return (
    <button className="launcher" onClick={() => setOpen(true)}>
      ⚗ {t("interactions")}
      {items.length > 0 && <span className="launcher__count">{items.length}</span>}
    </button>
  );
}

// Main App component - handles routing between pages
function App() {
  return (
    // Browser router for client-side routing
    <BrowserRouter>
      {/* Mouse-following line-grid background (behind content, sampled by the
          frosted header's backdrop blur) */}
      <Background />

      {/* Selected-substances store shared across all pages */}
      <CombosProvider>
        {/* Content layer sits above the background canvas */}
        <div className="app">
          <Routes>
            {/* Home page - displays all substances */}
            <Route path="/" element={<HomePage />} />
            {/* Substance detail page - shows details for a specific substance by ID */}
            <Route path="/substance/:id" element={<SubstancePage />} />
          </Routes>

          {/* Interaction checker: drawer + floating launcher (global) */}
          <Sidebar />
          <CombosLauncher />
        </div>
      </CombosProvider>
    </BrowserRouter>
  );
}

export default App;
