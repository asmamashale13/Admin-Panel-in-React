import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import AdminPage from './AdminPage';

const AllEmp = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    // Fetch all employees on component mount
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/allemp');
                setEmployees(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch employee data.');
            }
        };

        fetchEmployees();
    }, []);

    return (
        <>
        <AdminPage/>
        <Container style={{ maxWidth: '900px', marginTop: '2rem' }}>
            <h2 className="text-center my-4">All Employees</h2>

            {/* Display error message if fetching fails */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Emergency Contact</th>
                        <th>Email</th>
                        <th>Joining Date</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee.emp_id}>
                                <td>{employee.emp_id}</td>
                                <td>{employee.emp_name}</td>
                                <td>{employee.emp_mobile}</td>
                                <td>{employee.emp_emergencymob}</td>
                                <td>{employee.emp_email}</td>
                                <td>{new Date(employee.emp_joiningdate).toLocaleDateString()}</td>
                                <td>{employee.emp_address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No employees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
        </>
    );
};

export default AllEmp;
