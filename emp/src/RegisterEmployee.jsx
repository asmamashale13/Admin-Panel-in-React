import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import AdminPage from './AdminPage';

export default function RegisterEmployee() {
  const [empName, setEmpName] = useState('');
  const [empMobile, setEmpMobile] = useState('');
  const [empEmergencyMob, setEmpEmergencyMob] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empJoiningDate, setEmpJoiningDate] = useState('');
  const [empAddress, setEmpAddress] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseType, setResponseType] = useState(null); // 'success' or 'danger'

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/registeremp', {
        emp_name: empName,
        emp_mobile: empMobile,
        emp_EmergencyMob: empEmergencyMob,
        emp_email: empEmail,
        emp_joiningDate: empJoiningDate,
        emp_address: empAddress
      });
      setResponseMessage(response.data.message);
      setResponseType('success'); // Set the message type to success
      alert("Employee Added Successfully");

      // Reset form fields
      setEmpName('');
      setEmpMobile('');
      setEmpEmergencyMob('');
      setEmpEmail('');
      setEmpJoiningDate('');
      setEmpAddress('');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setResponseMessage(err.response.data.message); // Show duplicate error message
        setResponseType('danger'); // Set the message type to danger
        alert("Employee Already Exist With This Name");
      } else {
        setResponseMessage('Failed to register employee. Please try again.');
        setResponseType('danger'); // Set the message type to danger
      }
    }
  };

  return (
    <>
      <AdminPage />
      <Container style={{ maxWidth: '500px', marginTop: '2rem' }}>
        <h2 className="text-center my-4">Register Employee</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="empName">
            <Form.Label>Employee Name<span style={{ color: 'red' }}> * </span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter employee name"
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="empMobile">
            <Form.Label>Employee Mobile<span style={{ color: 'red' }}> * </span></Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter employee Mobile"
              value={empMobile}
              onChange={(e) => setEmpMobile(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="empEmergencyMob">
            <Form.Label>Emergency Contact</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Emergency Contact"
              value={empEmergencyMob}
              onChange={(e) => setEmpEmergencyMob(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="empEmail">
            <Form.Label>Employee Email<span style={{ color: 'red' }}> * </span></Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Employee Email"
              value={empEmail}
              onChange={(e) => setEmpEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="empJoiningDate">
            <Form.Label>Joining Date<span style={{ color: 'red' }}> * </span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Joining Date"
              value={empJoiningDate}
              onChange={(e) => setEmpJoiningDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="empAddress" className="mt-3">
            <Form.Label> Address </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={empAddress}
              onChange={(e) => setEmpAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Container className="d-flex justify-content-center my-4">
            <Button variant="success" type="submit" className="mt-4">
              Add Employee
            </Button>
          </Container>
        </Form>

        {responseMessage && (
          <Alert variant={responseType} className="mt-4">
            {responseMessage}
          </Alert>
        )}
      </Container>
    </>
  );
}
