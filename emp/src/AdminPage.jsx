import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import RegisterEmployee from './RegisterEmployee';
import AssignedTasks from './AssignedTasks';
import EmpList from './EmpList';
import AllEmp from './AllEmp';

function AdminPage() {
  const navigate=useNavigate();
    return (
      <>
      <Container style={{ maxWidth: '800px', marginTop: '2rem' }}>
      <h1 className="text-center">Welcome to admin page</h1><br></br>
      <div className=''>
      <NavLink to="/registeremployee"><Button class variant="primary" className='m-4 text-white' onClick=           {<RegisterEmployee/>}>Add Employee</Button></NavLink>
      
      <NavLink to="/emplist"><Button variant="primary" className='m-4' onClick={<EmpList/>}>Employee List</Button></NavLink>
      <NavLink to="/assignedtasks"><Button variant="primary" className='m-4' onClick={<AssignedTasks/>}>All Assigned Tasks</Button></NavLink>
      <NavLink to="/allemp"><Button variant="primary" className='m-4' onClick={<AllEmp/>}>All Employee Data</Button></NavLink>
      </div>
      </Container>


      
      </>
    );
  }
  
  export default AdminPage;