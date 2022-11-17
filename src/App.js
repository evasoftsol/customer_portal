
import './App.css';
import { Routes, Route } from 'react-router-dom';

//HOC layouts
import MainPage from './pages/MainPage.page';
import Login from './pages/Login.page';
// import BaseHoc from './hoc/BaseHoc';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/m" element={<MainPage />} />
      <Route path="/login" element={<Login />} />

      {/* <Route path="/" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
