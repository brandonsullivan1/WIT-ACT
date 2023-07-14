import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Button, Col, Container, Form, Row, Tab, Tabs, ProgressBar, InputGroup, Dropdown} from 'react-bootstrap';
import {EMAIL_REGEX, PHONE_NUMBER_REGEX, PWD_REGEX, VALID_MAJORS, VALID_MINORS, NAME_REGEX} from "../Validation/FormValidation";
import { Footer } from "../components/Footer";
import * as Tfi from "react-icons/tfi";
import Profile from "./Profile";

const TEST_EMAIL = "sullivanb13@wit.edu";
const TEST_PWD = "TestPassword1!";
export const LandingPage = () => {
    // Login Section

    const [loginValidated, setLoginValidated] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [validUserEmail, setValidUserEmail] = useState(false);

    useEffect(() => {
        const result = userEmail === "sullivanb13@wit.edu";
        setValidUserEmail(result);
    }, [userEmail])

    const handleLoginSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setLoginValidated(true);
    }

    // Register Section
    const [registerValidated, setRegisterValidated] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [pwdMatch, setPwdMatch] = useState('');
    const [validPwdMatch, setValidPwdMatch] = useState(false);

    const [major, setMajor] = useState('');
    const [validMajor, setValidMajor] = useState(false);

    const [minor, setMinor] = useState('');
    const [validMinor, setValidMinor] = useState(false);

    const [skillsList, setSkillsList] = useState([]);

    const [skill1, setSkill1] = useState('');
    const [validSkill1, setValidSkill1] = useState(false);

    const [skill2, setSkill2] = useState('');
    const [validSkill2, setValidSkill2] = useState(false);

    const [skill3, setSkill3] = useState('');
    const [validSkill3, setValidSkill3] = useState(false);

    const [skill4, setSkill4] = useState('');
    const [validSkill4, setValidSkill4] = useState(false);

    const [skill5, setSkill5] = useState('');
    const [validSkill5, setValidSkill5] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);

    const [discord, setDiscord] = useState('');
    const [validDiscord, setValidDiscord] = useState(false);

    const [registerPage1Hidden, setRegisterPage1Hidden] = useState(false);
    const [registerPage2Hidden, setRegisterPage2Hidden] = useState(true);
    const [registerPage3Hidden, setRegisterPage3Hidden] = useState(true);
    const [registerPage4Hidden, setRegisterPage4Hidden] = useState(true);

    const [progressBarState, setProgressBarState] = useState(0);

    const [activeKey, setActiveKey] = useState("login");
    const [loginDisabled, setLoginDisabled] = useState(false);
    const [registerDisabled, setRegisterDisabled] = useState(true);

    const changeTab = (e) => {
        e.preventDefault();
        if (activeKey === "login") {
            setActiveKey("register");
            setRegisterDisabled(false);
            setLoginDisabled(true);
        }

        if (activeKey === "register") {
            setActiveKey("login");
            setRegisterDisabled(true);
            setLoginDisabled(false);
        }
    }

    const page1 = () => {
        setRegisterPage1Hidden(false);
        setRegisterPage2Hidden(true);
        setRegisterPage3Hidden(true);
        setRegisterPage4Hidden(true);
        setProgressBarState(0);
    }

    const page2 = () => {
        setRegisterPage1Hidden(true);
        setRegisterPage2Hidden(false);
        setRegisterPage3Hidden(true);
        setRegisterPage4Hidden(true);
        setProgressBarState(25);
    }

    const page3 = () => {
        setRegisterPage1Hidden(true);
        setRegisterPage2Hidden(true);
        setRegisterPage3Hidden(false);
        setRegisterPage4Hidden(true);
        setProgressBarState(50);
    }

    const page4 = () => {
        setRegisterPage1Hidden(true);
        setRegisterPage2Hidden(true);
        setRegisterPage3Hidden(true);
        setRegisterPage4Hidden(false);
        setProgressBarState(75);
    }

    const handleRegisterSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setRegisterValidated(true);
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
                <Tabs activeKey={activeKey} fill justify style={{width: "100%", backgroundColor: "lightgray", color: "white"}}>
                    <Tab eventKey="login" title="Login" disabled={loginDisabled}>
                        <Container style={{backgroundColor: "white"}}>
                            <Form noValidate validated={loginValidated}>
                                <Row className="mt-3">
                                    <Col md="3"></Col>
                                    <Col md="6">
                                        <Form.Group controlId="validationCustom01">
                                            <Form.Label style={{color: "black"}}>Email</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="email@wit.edu"
                                                onChange={(e) => setUserEmail(e.target.value)}
                                                value={userEmail}
                                                isInvalid={!validUserEmail && userEmail.length !== 0}
                                            />
                                            <Form.Control.Feedback
                                                type={validUserEmail ? "valid" : "invalid"}></Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="validationUserPwd">
                                            <Form.Label style={{color: "black"}}>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="password"
                                                required
                                            />
                                            <Form.Control.Feedback type="invald">Invalid
                                                password.</Form.Control.Feedback>
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
                                            <p className="mt-3" style={{color: "black"}}>Don't have an account? <a href='' onClick={changeTab} style={{color: "black"}}>Register here.</a></p>
                                        </Container>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Tab>

                    <Tab eventKey="register" title="Register" disabled={registerDisabled}>
                        <Container style={{backgroundColor: "white"}}>
                            <Form noValidate validated={registerValidated} onSubmit={handleRegisterSubmit}>
                                <Container>
                                    <Row>
                                        <Col md="3"></Col>
                                        <Col md="6">

                                            <ProgressBar className="mt-1" now={progressBarState}/>

                                            <Container className="mt-3" hidden={registerPage1Hidden}>
                                                <Form.Group controlId="emailValidation">
                                                    <Form.Label style={{color: "black"}}>Email</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="email@wit.edu"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        value={email}
                                                    />

                                                </Form.Group>

                                                <Form.Group controlId="pwdValidation">
                                                    <Form.Label style={{color: "black"}}>Password</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        placeholder="Password"
                                                        onChange={(e) => setPwd(e.target.value)}
                                                        value={pwd}
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId="matchPwdValidation">
                                                    <Form.Label style={{color: "black"}}>Confirm Password</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        onChange={(e) => setPwdMatch(e.target.value)}
                                                        value={pwdMatch}
                                                    />
                                                </Form.Group>

                                                <Container className="mt-3">
                                                    <Button onClick={page2} style={{
                                                        border: "2px solid black",
                                                        backgroundColor: "white",
                                                        padding: "1rem 7rem",
                                                        borderRadius: "10px",
                                                        cursor: "pointer",
                                                        color: "black"
                                                    }}>Next</Button>
                                                    <p className="mt-3" style={{color: "black"}}>Already have an account? <a href='' onClick={changeTab} style={{color: "black"}}>Login here.</a></p>
                                                </Container>
                                            </Container>

                                            <Container className="mt-3" hidden={registerPage2Hidden}>
                                                <Form.Group controlId="majorValidation">
                                                    <Form.Label style={{color: "black"}}>Major</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Major"
                                                        onChange={(e) => setMajor(e.target.value)}
                                                        value={major}
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId="minorValidation">
                                                    <Form.Label style={{color: "black"}}>Minor</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="(Optional)"
                                                        onChange={(e) => setMinor(e.target.value)}
                                                        value={minor}
                                                    />
                                                </Form.Group>

                                                <Container className="mt-3">
                                                    <Row style={{display: "inline-flex"}}>
                                                        <Col md="6"
                                                             style={{alignItems: "center", justifyContent: "center"}}>
                                                            <Button onClick={page1} style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "white",
                                                                padding: "1rem 1rem",
                                                                borderRadius: "10px",
                                                                cursor: "pointer",
                                                                color: "black"
                                                            }}>Back</Button>
                                                        </Col>
                                                        <Col md="6">
                                                            <Button onClick={page3} style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "white",
                                                                padding: "1rem 1rem",
                                                                borderRadius: "10px",
                                                                cursor: "pointer",
                                                                color: "black"
                                                            }}>Next</Button>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            </Container>

                                            <Container className="mt-3" hidden={registerPage3Hidden}>
                                                <Form.Group controlId="skill1Validation">
                                                    <Form.Label style={{color: "black"}}>Skill 1</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Skill 1"
                                                        onChange={(e) => setSkill1(e.target.value)}
                                                        value={skill1}
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId="skill2Validation">
                                                    <Form.Label style={{color: "black"}}>Skill 2</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Skill 2"
                                                        onChange={(e) => setSkill2(e.target.value)}
                                                        value={skill2}
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId="skill3Validation">
                                                    <Form.Label style={{color: "black"}}>Skill 3</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Skill 3"
                                                        onChange={(e) => setSkill3(e.target.value)}
                                                        value={skill3}
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId="skill4Validation">
                                                    <Form.Label style={{color: "black"}}>Skill 4</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Skill 4"
                                                        onChange={(e) => setSkill4(e.target.value)}
                                                        value={skill4}
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId="skill5Validation">
                                                    <Form.Label style={{color: "black"}}>Skill 5</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Skill 5"
                                                        onChange={(e) => setSkill5(e.target.value)}
                                                        value={skill5}
                                                    />
                                                </Form.Group>

                                                <Container className="mt-3">
                                                    <Row style={{display: "inline-flex"}}>
                                                        <Col md="6"
                                                             style={{alignItems: "center", justifyContent: "center"}}>
                                                            <Button onClick={page2} style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "white",
                                                                padding: "1rem 1rem",
                                                                borderRadius: "10px",
                                                                cursor: "pointer",
                                                                color: "black"
                                                            }}>Back</Button>
                                                        </Col>
                                                        <Col md="6">
                                                            <Button onClick={page4} style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "white",
                                                                padding: "1rem 1rem",
                                                                borderRadius: "10px",
                                                                cursor: "pointer",
                                                                color: "black"
                                                            }}>Next</Button>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            </Container>

                                            <Container className="mt-3" hidden={registerPage4Hidden}>
                                                <Form.Group controlId="phoneNumberValidation">
                                                    <Form.Label style={{color: "black"}}>Phone Number</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="(Optional)"
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        value={phoneNumber}
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId="discordValidation">
                                                    <Form.Label style={{color: "black"}}>Discord</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="(Optional)"
                                                        onChange={(e) => setDiscord(e.target.value)}
                                                        value={discord}
                                                    />
                                                </Form.Group>

                                                <Container className="mt-3">
                                                    <Row style={{display: "inline-flex"}}>
                                                        <Col md="6"
                                                             style={{alignItems: "center", justifyContent: "center"}}>
                                                            <Button onClick={page3} style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "white",
                                                                padding: "1rem 1rem",
                                                                borderRadius: "10px",
                                                                cursor: "pointer",
                                                                color: "black"
                                                            }}>Back</Button>
                                                        </Col>
                                                        <Col md="6">
                                                            <Button type="submit" style={{
                                                                border: "2px solid black",
                                                                backgroundColor: "white",
                                                                padding: "1rem 1rem",
                                                                borderRadius: "10px",
                                                                cursor: "pointer",
                                                                color: "black"
                                                            }}>Register</Button>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            </Container>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </Container>
                    </Tab>
                </Tabs>
            </Container>

            <Footer/>
        </Container>
    );
}

export default LandingPage;