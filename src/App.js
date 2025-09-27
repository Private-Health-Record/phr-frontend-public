import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NewAccount from './pages/CreateAcc';
import DoctorProfile from "./pages/CreateAccDoctor";
import PatientProfile from "./pages/CreateAccPatient";
import TreatmentForm from "./pages/Treatements";
import CreateAccOptions from "./pages/CreateAccOptions";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CreateAcc" element={<NewAccount />} />
        <Route path="/CreateAccOptions" element={<CreateAccOptions />} />
        <Route path="/CreateAccDoctor" element={<DoctorProfile />} />
        <Route path="/CreateAccPatient" element={<PatientProfile />} />
        <Route path="/Treatements" element={<TreatmentForm />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
