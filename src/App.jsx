import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import QuotationTool from "./components/QuotationTool";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tool" element={<QuotationTool />} />
      </Routes>
    </Router>
  );
}

export default App;
