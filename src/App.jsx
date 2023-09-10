import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./layouts/Landing.jsx"
import Home from "./layouts/OrderConverter/Home.jsx"
import Converter from "./layouts/OrderConverter/Converter.jsx"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/oc-home" element={<Home />} />
        <Route path="/oc-converter/:customer" element={<Converter />} />
      </Routes>
    </Router>
  );
}

export default App;
