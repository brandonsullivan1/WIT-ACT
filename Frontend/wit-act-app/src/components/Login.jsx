import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

export const Login = () => {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    useEffect(() => {
        const result = email === "sullivanb13@wit.edu";
        setValidEmail(result);
    }, [email])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        navigate('/verification');
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mt-3">
                <Col md="3"></Col>
                <Col md="6">
                    <Form.Group controlId="emailValidation">
                        <Form.Label style={{color: "black"}}>Email</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="email@wit.edu"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            isInvalid={!validEmail && email.length !== 0}
                        />
                        <Form.Control.Feedback
                            type={validEmail ? "valid" : "invalid"}></Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="pwdValidation">
                        <Form.Label style={{color: "black"}}>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <Form.Control.Feedback type="invald">Invalid
                            password.</Form.Control.Feedback>
                        <p style={{color: "black"}}><a style={{cursor: "pointer"}}>Forgot password?</a></p>
                    </Form.Group>

                    <Container className="mt-3">
                        <Button type="submit" style={{
                            border: "2px solid black",
                            backgroundColor: "white",
                            padding: "1rem 7rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "black"
                        }}>Login</Button>

                    </Container>
                </Col>
            </Row>
        </Form>
    )
}

export default Login;