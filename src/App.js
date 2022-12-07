
import './App.css';
import { Routes, Route } from 'react-router-dom';

//HOC layouts
import Login from './pages/Login.page';
import ServiceSchedule from './pages/ServiceSchedule.page';
import Payments from './pages/Payments.page';
import Complaints from './pages/Complaints.page';
import Projects from './pages/Project.page'
import Contracts from './pages/Contracts.page'
import Renewals from './pages/Renewals.page';
// import BaseHoc from './hoc/BaseHoc';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<ServiceSchedule />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/complaints" element={<Complaints />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/renewals" element={<Renewals />} />
    </Routes>

  );
}

export default App;
