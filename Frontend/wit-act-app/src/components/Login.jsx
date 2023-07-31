import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

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

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    useEffect(() => {
        const result = email === "sullivanb13@wit.edu";
        setValidEmail(result);
    }, [email])


    // Pull user's account from DB and test for login validation

    const validateForm = () => {
        const {
            email,
            password,
        } = form;

        const newErrors = {};

        if (!email || email === '') newErrors.email = 'No user found with that email.';
        if (!pwd || pwd === '') newErrors.password = 'Incorrect password';

        return newErrors;
    }


    const handleSubmit = async (event) => {
        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setValidated(false);
        } else {
            setValidated(true);
            console.log("Valid form!");
            await axios.post("http://localhost:3100/users/fetchuser", {
                email: email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Mode': 'cors'
                }
            })
                .then((response) => {
                    console.log(response);
                    if(!(200 <= response.status && response.status <= 299)){
                        console.log(`Error: Response code ${response.status} from server!`);
                    } else {
                        setValidated(true);
                        console.log(validated);
                        navigate('/homepage');
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} id="loginForm">
            <Row className="mt-3">
                <Col md="3"></Col>
                <Col md="6">
                    <Form.Group controlId="emailValidation">
                        <Form.Label style={{color: "black"}}>Email</Form.Label>
                        <Form.Control
                            required
                            type="text"
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

                    <Form.Group controlId="pwdValidation">
                        <Form.Label style={{color: "black"}}>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => {
                                setPwd(e.target.value);
                                setField('password', e.target.value);
                            }}
                            value={pwd}
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