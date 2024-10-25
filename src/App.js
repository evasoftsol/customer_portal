
import './App.css';
import { Routes, Route } from 'react-router-dom';

//HOC layouts
import Login from './pages/Login.page';
import ServiceSchedule from './pages/ServiceSchedule.page';
import Payments from './pages/Payments.page';
import Complaints from './pages/Complaints.page';
import AttendanceAndPayroll from './pages/AttendanceAndPayroll.page'
import Contracts from './pages/Contracts.page'
import Renewals from './pages/Renewals.page';
import Profile from './pages/Profile.page';
import Audits from './pages/Audits.page';
import Report from './pages/Report.page';
import Report2 from './pages/Report2.page';
// import BaseHoc from './hoc/BaseHoc';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/services" element={<ServiceSchedule />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/complaints" element={<Complaints />} />
      <Route path="/projects" element={<AttendanceAndPayroll />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/renewals" element={<Renewals />} />
      <Route path="/audits" element={<Audits />} />
      <Route path="/report" element={<Report />} />
      <Route path="/report2" element={<Report2 />} />
    </Routes>

  );


}

export default App;
