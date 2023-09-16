import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./layouts/Landing.jsx"
import Login from "./layouts/Login.jsx"
import SetupData from "./layouts/Configuration/SetupData.jsx"
import Converter from "./layouts/OrderConverter/Converter.jsx"
import Manager from "./layouts/OrderManager/Manager.jsx"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/config" element={<SetupData />} />
        <Route path="/oc/:customer" element={<Converter />} />
        <Route path="/om/:customer" element={<Manager />} />
      </Routes>
    </Router>
  );
}

export default App;
