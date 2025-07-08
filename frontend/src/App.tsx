import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import MachinesPage from "./pages/MachinesPage"
import MaintenancePage from "./pages/MaintenancePage"
import ComplaintsPage from "./pages/ComplaintsPage"
import MachineDetailPage from "./pages/MachineDetailPage"
import MaintenanceDetailPage from "./pages/MachineDetailPage"
import ComplaintDetailPage from "./pages/ComplaintDetailPage"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/machines" element={<MachinesPage />} />
          <Route path="/machines/:id" element={<MachineDetailPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/maintenance/:id" element={<MaintenanceDetailPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/complaints/:id" element={<ComplaintDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
