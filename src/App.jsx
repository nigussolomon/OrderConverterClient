import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./layouts/Landing.jsx"
import Configuration from "./layouts/Configuration/Configuration.jsx"
import SourceMapping from "./layouts/Configuration/SourceMapping.jsx"
import SetupData from "./layouts/Configuration/SetupData.jsx"
import ConverterHome from "./layouts/OrderConverter/Home.jsx"
import ManagerHome from "./layouts/OrderManager/Home.jsx"
import Converter from "./layouts/OrderConverter/Converter.jsx"
import Manager from "./layouts/OrderManager/Manager.jsx"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/config" element={<Configuration />} />
        <Route path="/config/sm" element={<SourceMapping />} />
        <Route path="/config/sd" element={<SetupData />} />
        <Route path="/oc/home" element={<ConverterHome />} />
        <Route path="/oc/:customer" element={<Converter />} />
        <Route path="/om/home" element={<ManagerHome />} />
        <Route path="/om/:customer" element={<Manager />} />
      </Routes>
    </Router>
  );
}

export default App;
