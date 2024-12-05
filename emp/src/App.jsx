import { StrictMode } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignUp from './Emp/SignUp';
import Login from './Login';
import AdminPage from './AdminPage';
import RegisterEmployee from './RegisterEmployee';
import AssignedTasks from './AssignedTasks';
import EmpList from './EmpList';
import AllEmp from './AllEmp';

function App() {
  return (
  <StrictMode>

    <BrowserRouter>
 
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/registeremployee" element={<RegisterEmployee />}/>
    <Route path="/emplist" element={<EmpList />} />
    <Route path="/assignedtasks" element={<AssignedTasks />} />
    <Route path="/allemp" element={<AllEmp />} />

    </Routes>

    </BrowserRouter>

  </StrictMode>
  );
}

export default App;
