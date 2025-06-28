import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DrawingPage from "./pages/DrawingPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:id" element={<DrawingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
