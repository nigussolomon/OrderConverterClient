import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./layouts/Landing.jsx"
import Login from "./layouts/Login.jsx"
import SetupData from "./layouts/Configuration/SetupData.jsx"
import Converter from "./layouts/OrderConverter/Converter.jsx"
import Manager from "./layouts/OrderManager/Manager.jsx"
import Home from "./layouts/PriceList/Home.jsx"
import MasterPl from "./layouts/PriceList/MasterList.jsx"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/config" element={<SetupData />} />
        <Route path="/oc/:id/:customer" element={<Converter />} />
        <Route path="/om/:id/:customer" element={<Manager />} />
        <Route path="/pl" element={<Home />} />
        <Route path="/pl/master" element={<MasterPl />} />
      </Routes>
    </Router>
  );
}

export default App;
