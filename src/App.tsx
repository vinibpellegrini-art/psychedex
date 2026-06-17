import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubstancePage from "./pages/SubstancePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/substance/:id" element={<SubstancePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;