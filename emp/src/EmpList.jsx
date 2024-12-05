import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AdminPage from './AdminPage';
import EmployeeDetails from './EmployeeDetails';
import AssignTaskForm from './AssignTaskForm';

export default function EmpList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAssignTaskOpen, setIsAssignTaskOpen] = useState(false);

  // Fetch employee data on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allemp');
        setEmployees(response.data);
      } catch (err) {
        setError('Failed to fetch employee data.');
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  // Function to handle showing employee details
  const showDetails = (employee) => setSelectedEmployee(employee);

  // Function to handle opening the assign task form
  const openAssignTaskForm = (employee) => {
    setSelectedEmployee(employee);
    setIsAssignTaskOpen(true);
  };

  return (
    <>
      <AdminPage />
      <Container style={{ maxWidth: '700px', marginTop: '2rem' }}>
        <h2 className="text-center my-4">Employee List</h2>

        {/* Display error message if fetching fails */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.emp_id}>
                  <td>{emp.emp_id}</td>
                  <td>{emp.emp_name}</td>
                  <td>
                    <Button variant="info" onClick={() => showDetails(emp)}>
                      Details
                    </Button>{' '}
                    <Button variant="primary" onClick={() => openAssignTaskForm(emp)}>
                      Assign Task
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No employees found.</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Render EmployeeDetails if an employee is selected */}
        {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}

        {/* Render AssignTaskForm if isAssignTaskOpen is true */}
        {isAssignTaskOpen && (
          <AssignTaskForm
            employee={selectedEmployee}
            onClose={() => setIsAssignTaskOpen(false)}
          />
        )}
      </Container>
    </>
  );
}
