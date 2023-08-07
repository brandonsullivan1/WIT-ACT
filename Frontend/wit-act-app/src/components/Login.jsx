import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

/*
 TODO: Fix bug where form needs to be submitted twice to clear
 TODO: Catch 404 in axios
 */

/*
    This file is used for a user to login.

    The file contains the form a user fills out with their email and password.
    The file calls the database and checks if all data the user entered is correct
    and allows or denies log in based on the result.
 */

export const Login = () => {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);


    const validateForm = async () => {
        const {
            email,
            password,
        } = form;

        const newErrors = {};
        try{
            const response = await axios.post("http://localhost:3100/users/fetchuser", {
                email: email
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Mode': 'cors'
                }
            });
            if(response.status < 200 || response.status > 299) {
                console.log("Error:" + response);
            } else {
                console.log(response);
                const fetchedEmail = response["data"]["Email"];
                setValidEmail(email === fetchedEmail);
                const fetchedPassword = response["data"]["Password"];
                // decryption goes here
                setValidPassword(password === fetchedPassword);
            }
        }
        catch (err){
            console.log(err)
        }
        if (!validEmail) newErrors.email = 'No user found with that email.';
        if (!validPassword) newErrors.password = 'Incorrect password';
        console.log(newErrors);
        return newErrors;
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = await validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setValidated(false);
        } else {
            setValidated(true);
            console.log("Valid form!");
            navigate("/homepage");
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} id="loginForm">
            <Row className="mt-3">
                <Col md="3"></Col>
                <Col md="6">
                    <Form.Group controlId="email">
                        <Form.Label style={{color: "black"}}>Email</Form.Label>
                        <Form.Control
                            required={true}
                            type="text"
                            id="email"
                            placeholder="email@wit.edu"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setField('email', e.target.value);
                            }}
                            value={email}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label style={{color: "black"}}>Password</Form.Label>
                        <Form.Control
                            required={true}
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setField('password', e.target.value);
                            }}
                            value={password}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <p style={{color: "black"}}><a style={{cursor: "pointer"}}>Forgot password?</a></p>

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