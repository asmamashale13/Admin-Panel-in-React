import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Nav } from 'react-bootstrap';

function SignUp() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  // Toggle between login and signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
  <>
  <center>
  <div>
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="w-100">
        <Col md={6}>
          <Card className='' >
            <Card.Body>
              <Card.Title className="text-center">{isLogin ? 'Login' : 'Sign Up'}</Card.Title>

              <Form>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" required />
                </Form.Group>

                {isLogin ? (
                  <>
                    <br></br><Button variant="primary" type="submit" block>
                      Login
                    </Button>
                    <div className="text-center mt-2">
                      <Nav.Link onClick={toggleForm}>Don't have an account? Sign Up</Nav.Link>
                    </div>
                  </>
                ) : (
                  <>
                    <Form.Group controlId="formBasicConfirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" placeholder="Confirm Password" required />
                    </Form.Group><br></br>
                    <Button variant="success" type="submit" block>
                      Sign Up
                    </Button>
                    <div className="text-center mt-2">
                      <Nav.Link onClick={toggleForm}>Already have an account? Login</Nav.Link>
                    </div>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    </center>
    </>
  );
}

export default SignUp;