import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import QuotationWizard from "./components/QuotationWizard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tool" element={<QuotationWizard />} />
      </Routes>
    </Router>
  );
}

export default App;
