import React from "react";
import { Container } from "react-bootstrap";
import { Form, Button } from 'react-bootstrap';

export default function EmpLogin(){
    return(
        <>
        <Container style={{ maxWidth: '500px', marginTop: '2rem' }}>

  <div className="login-container">
  <center>
    <h2>Admin Login</h2>
    <Form onSubmit={handleLogin}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group><br></br>
      <Button variant="primary" type="submit">
        Login
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Form>
  </center>
</div>
</Container>
        </>
    )
}