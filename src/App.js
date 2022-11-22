
import './App.css';
import { Routes, Route } from 'react-router-dom';

//HOC layouts
import MainPage from './pages/MainPage.page';
import Login from './pages/Login.page';
import ServiceSchedule from './pages/ServiceSchedule.page';
import Payments from './pages/Payments.page';
import Complaints from './pages/Complaints.page';
import Projects from './pages/Project.page'
import ContractsAndRenewals from './pages/ContractsAndRenewals.page'
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
      <Route path="/contracts" element={<ContractsAndRenewals />} />
    </Routes>

  );
}

export default App;
