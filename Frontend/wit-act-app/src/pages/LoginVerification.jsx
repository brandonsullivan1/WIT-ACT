import React, { useState, useEffect, useRef } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {Button, Col, Container, Form, Row, Tab, Tabs} from "react-bootstrap";
import Footer from "../components/Footer";

const TEST_CODE = "111111";

export const LoginVerification = () => {
    const navigate = useNavigate();

    const loginLink = () => {
        navigate('/');
    }

    const homepageLink = () => {
        navigate('/homepage');
    }

    const [validated, setValidated] = useState(false);

    const codeRef = useRef();
    const errRef = useRef();

    const [code, setCode] = useState('');
    const [validCode, setValidCode] = useState(false);
    const [codeFocus, setCodeFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const result = (code === TEST_CODE);
        console.log(result);
        console.log(code);
        setValidCode(result);
    }, [code])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = (code === TEST_CODE);
        if (!v1) {
            setErrMsg('Invalid Entry');
            return;
        }
        console.log(code);
        setValidated(true);
        homepageLink();
    }

    return (
        <Container>
            <Container style={{
                border: "1px solid white",
                padding: "0",
                borderTopLeftRadius: "7px",
                borderTopRightRadius: "7px",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Tabs fill justify style={{width: "100%", backgroundColor: "lightgray", color: "white"}}>
                    <Tab eventKey="verify" title="Verification">
                        <Container style={{backgroundColor: "white"}}>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="mt-3">
                                    <Col md="3"></Col>
                                    <Col md="6">
                                        <Form.Group controlId="codeVerification">
                                            <Form.Label style={{color: "black"}}>Code:</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="000000"
                                                onChange={(e) => setCode(e.target.value)}
                                                value={code}
                                                isInvalid={code !== TEST_CODE}
                                            />
                                            <Form.Control.Feedback
                                                type={validCode ? "valid" : "invalid"}>Invalid code.</Form.Control.Feedback>
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
                                            <p className="mt-3" style={{color: "black"}}><a href='' onClick={() => navigate('/')} style={{color: "black"}}>Back to login.</a></p>
                                        </Container>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Tab>
                </Tabs>
            </Container>

            <Footer />
        </Container>
    )
}

export default LoginVerification;