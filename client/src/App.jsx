import "./App.css";
import About from "./components/About";
import Data from "./components/Data";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />}>
            About
          </Route>
          <Route path="/data" element={<Data />}>
            Data
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
