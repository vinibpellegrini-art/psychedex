import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubstancePage from "./pages/SubstancePage";

// Main App component - handles routing between pages
function App() {
  return (
    // Browser router for client-side routing
    <BrowserRouter>
      <Routes>
        {/* Home page - displays all substances */}
        <Route path="/" element={<HomePage />} />
        {/* Substance detail page - shows details for a specific substance by ID */}
        <Route path="/substance/:id" element={<SubstancePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;