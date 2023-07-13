import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Button, Col, Container, Form, Row, Tab, Tabs, ProgressBar, InputGroup} from 'react-bootstrap';
import {EMAIL_REGEX, PHONE_NUMBER_REGEX, PWD_REGEX, VALID_MAJORS, VALID_MINORS, NAME_REGEX} from "../Validation/FormValidation";
import { Footer } from "../components/Footer";
import * as Gr from "react-icons/gr";

const TEST_EMAIL = "sullivanb13@wit.edu";
const TEST_PWD = "TestPassword1!";
export const LandingPage = () => {
    const [loginValidated, setLoginValidated] = useState(false);
    const [registrationValidated, setRegistrationValidated] = useState(false);

    const [progressBarState, setProgressBarState] = useState(0);

    const navigate = useNavigate();

    // Login Section

    const [userEmail, setUserEmail] = useState('');
    const [validUserEmail, setValidUserEmail] = useState(false);
    const [userEmailFocus, setUserEmailFocus] = useState(false);

    const [userPwd, setUserPwd] = useState('');
    const [validUserPwd, setValidUserPwd] = useState(false);
    const [userPwdFocus, setUserPwdFocus] = useState(false);

    // test user email validity
    useEffect(() => {
        // check if email is in database
        const result = userEmail === TEST_EMAIL;
        setValidUserEmail(result);
    }, [userEmail])

    // test user password validity
    useEffect(() => {
        // check if password matches password in database stored by user's email
        const result = userPwd === TEST_PWD;
        setValidUserPwd(result);
    }, [userPwd])

    const handleLoginSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setLoginValidated(true);
    }

    // Register Section

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [major, setMajor] = useState('');
    const [validMajor, setValidMajor] = useState(false);

    const [minor, setMinor] = useState('');
    const [validMinor, setValidMinor] = useState(false);

    const [skills, setSkills] = useState('');
    const [skillsList, setSkillsList] = useState([]);

    const[skill1, setSkill1] = useState('');
    const[skill2, setSkill2] = useState('');
    const[skill3, setSkill3] = useState('');
    const[skill4, setSkill4] = useState('');
    const[skill5, setSkill5] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const emailRef = useRef();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [pwdMatch, setPwdMatch] = useState('');
    const [validPwdMatch, setValidPwdMatch] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);

    const [discord, setDiscord] = useState('');

    const [page1, setPage1] = useState(false);
    const [page2, setPage2] = useState(true);
    const [page3, setPage3] = useState(true);
    const [page4, setPage4] = useState(true);

    const [registerEmailPwdValidated, setRegisterEmailPwdValidated] = useState(false);

    const showPage1 = () => {
        setPage1(false);
        setPage2(true);
        setProgressBarState(0);
    }

    const showPage2 = () => {
        setPage1(true);
        setPage2(false);
        setProgressBarState(25);
    }

    const showPage3 = () => {
        setPage2(true);
        setPage3(false);
        setProgressBarState(50);
    }

    const showPage4 = () => {
        setPage3(true);
        setPage4(false);
        setProgressBarState(75);
    }

    // test name validity
    useEffect(() => {
        const result = NAME_REGEX.test(name);
        setValidName(result);
    }, [name])

    // test major validity
    useEffect(() => {
        const result = VALID_MAJORS.includes(major);
        setValidMajor(result);
    }, [major])

    // test minor validity
    useEffect(() => {
        const result = VALID_MINORS.includes(minor);
        setValidMinor(result);
    }, [minor])

    // set users skills list
    useEffect(() => {
        const result = skills.length !== 0;
        setSkillsList(skills.split(", "));
    }, [skills])

    // test email validity
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    // test password validity
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
    }, [pwd])

    // test password match validity
    useEffect(() => {
        const result = pwd === pwdMatch;
        setValidPwdMatch(result);
    }, [pwd, pwdMatch])

    // test phone number validity
    useEffect(() => {
        const result = PHONE_NUMBER_REGEX.test(phoneNumber);
        setValidPhoneNumber(result);
    }, [phoneNumber])

    const handleRegisterSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        // const testEmail = EMAIL_REGEX.test(email);
        // const testPwd = PWD_REGEX.test(pwd);
        // const testPwdMatch = pwd === pwdMatch;
        //
        // if (testEmail && testPwd && testPwdMatch) setRegisterEmailPwdValidated(true);
        setRegistrationValidated(true);
    }

    return (
        <Container>
            <Container style={{border: "1px solid white", padding: "0", borderTopLeftRadius: "7px", borderTopRightRadius: "7px", justifyContent: "center", alignItems: "center"}}>
                    <Tabs defaultActiveKey="login" fill justify style={{width: "100%"}}>
                        <Tab eventKey="login" title="Login">
                            <Container style={{backgroundColor: "white"}}>
                                <Form noValidate validated={loginValidated} id="loginForm" onSubmit={handleLoginSubmit}>
                                        <Container>
                                            <Row>
                                                <Col md="3"></Col>
                                                <Col md="6">
                                                    <Form.Group controlId="formUserEmail">
                                                        <Form.Label style={{color: "black"}}>Email</Form.Label>
                                                        <InputGroup>
                                                            <Form.Control
                                                                required
                                                                value={userEmail}
                                                                isInvalid={!validUserEmail && loginValidated}
                                                                id="validationUserEmail"
                                                                type="text"
                                                                placeholder="email@wit.edu"
                                                                autoComplete="off"
                                                                onChange={(e) => setUserEmail(e.target.value)}
                                                            />
                                                            <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>

                                                    <Form.Group controlId="validationUserPwd">
                                                        <Form.Label style={{color: "black"}}>Password</Form.Label>
                                                        <Form.Control
                                                            required
                                                            id="validationUserPwd"
                                                            type="password"
                                                            placeholder="Password"
                                                            // autoComplete="off"
                                                            // onChange={(e) => setUserPwd(e.target.value)}
                                                            // value={userPwd}
                                                        />
                                                    </Form.Group>
                                                    <Form.Control.Feedback type="invalid">Wrong</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Container>
                                    <Container className="mt-3">
                                        <Button type="submit" style={{border: "none", backgroundColor: "black", padding: "1rem 9rem", borderRadius: "10px", cursor: "pointer", color: "white"}}>Login</Button>
                                        <p className="mt-3">Don't have an account? <a href='#'>Register here.</a></p>
                                    </Container>
                                </Form>
                            </Container>
                        </Tab>
                        <Tab eventKey="register" title="Register">
                            <Container style={{backgroundColor: "white"}}>
                                <Form noValidate validated={registerEmailPwdValidated} onSubmit={handleRegisterSubmit}>
                                    <Container>
                                        {/*<ProgressBar className="mt-1" now={progressBarState} />*/}
                                        <Row>
                                            <Col md="3"></Col>
                                            <Col md="6">
                                                <Form.Group controlId="emailValidation" hidden={page1}>
                                                    <Form.Label style={{color: "black"}}>Email</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="email@wit.edu"
                                                        // ref={emailRef}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        value={email}
                                                        isInvalid={validEmail && registrationValidated}
                                                        onFocus={() => setEmailFocus(true)}
                                                    />
                                                    <Form.Control.Feedback id="emailValidation" type={validEmail ? "valid" : "invalid"}>
                                                        Invalid email.
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label style={{color: "black"}}>Password</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        placeholder="Password"
                                                        onChange={(e) => setPwd(e.target.value)}
                                                        value={pwd}
                                                        aria-invalid={validPwd ? "false" : "true"}
                                                    />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label style={{color: "black"}}>Confirm Password</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        onChange={(e) => setPwdMatch(e.target.value)}
                                                        value={pwdMatch}
                                                        aria-invalid={validPwdMatch ? "false" : "true"}
                                                    />
                                                </Form.Group>
                                                <Container className="mt-3">
                                                    <Button
                                                        type="submit"
                                                        style={{border: "2px solid black", backgroundColor: "white", padding: "1rem 7rem", borderRadius: "10px", cursor: "pointer", color: "black"}}
                                                        // disabled={!validEmail || !validPwdMatch || !validPwdMatch}
                                                        // onClick={showPage2}
                                                    >
                                                        Submit
                                                    </Button>
                                                </Container>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form>

                                {/*<Form>*/}
                                {/*    <Container>*/}
                                {/*        <Row>*/}
                                {/*            <Form.Group as={Col} md={"3"}></Form.Group>*/}
                                {/*            <Form.Group as={Col} md="6" controlId="registerValidation" hidden={page2}>*/}
                                {/*                <Form.Label style={{color: "black"}}>Full name</Form.Label>*/}
                                {/*                <Form.Control*/}
                                {/*                    required*/}
                                {/*                    type="text"*/}
                                {/*                    placeholder="Full name"*/}
                                {/*                    onChange={(e) => setName(e.target.value)}*/}
                                {/*                    value={name}*/}
                                {/*                    aria-invalid={validName ? "false" : "true"}*/}
                                {/*                />*/}
                                {/*                <Form.Label style={{color: "black"}}>Major</Form.Label>*/}
                                {/*                <Form.Control*/}
                                {/*                    required*/}
                                {/*                    type="text"*/}
                                {/*                    placeholder="Major"*/}
                                {/*                    onChange={(e) => setMajor(e.target.value)}*/}
                                {/*                    value={major}*/}
                                {/*                    aria-invalid={validMajor ? "false" : "true"}*/}
                                {/*                />*/}

                                {/*                <Form.Label style={{color: "black"}}>Minor</Form.Label>*/}
                                {/*                <Form.Control*/}
                                {/*                    type="text"*/}
                                {/*                    placeholder="Minor"*/}
                                {/*                    onChange={(e) => setMinor(e.target.value)}*/}
                                {/*                    value={minor}*/}
                                {/*                    aria-invalid={validMinor ? "false" : "true"}*/}
                                {/*                />*/}
                                {/*                <Container className="mt-3">*/}
                                {/*                    <Row>*/}
                                {/*                        <Button*/}
                                {/*                            style={{width:"25%", border: "2px solid black", backgroundColor: "white", borderRadius: "10px", cursor: "pointer", color: "black"}}*/}
                                {/*                            onClick={showPage1}*/}
                                {/*                        >*/}
                                {/*                            Back*/}
                                {/*                        </Button>*/}
                                {/*                        <Button*/}
                                {/*                            className="mt-1"*/}
                                {/*                            style={{width:"25%", border: "2px solid black", backgroundColor: "white", borderRadius: "10px", cursor: "pointer", color: "black"}}*/}
                                {/*                            // disabled={!validEmail || !validPwdMatch || !validPwdMatch}*/}
                                {/*                            onClick={showPage3}*/}
                                {/*                        >*/}
                                {/*                            Next*/}
                                {/*                        </Button>*/}
                                {/*                    </Row>*/}
                                {/*                </Container>*/}
                                {/*            </Form.Group>*/}
                                {/*        </Row>*/}
                                {/*    </Container>*/}
                                {/*</Form>*/}

                                {/*<Form>*/}
                                {/*    <Container>*/}
                                {/*        <Row>*/}
                                {/*            <Form.Group as={Col} md={"3"}></Form.Group>*/}
                                {/*            <Form.Group as={Col} md="6" hidden={page3}>*/}
                                {/*                <Form.Label style={{color: "black"}}>Skill 1</Form.Label>*/}
                                {/*                <Form.Control*/}
                                {/*                    required*/}
                                {/*                    type="text"*/}
                                {/*                    placeholder="Skill 1"*/}
                                {/*                    onChange={(e) => setSkills(e.target.value)}*/}
                                {/*                    value={skills}*/}
                                {/*                />*/}

                                {/*                <Form.Label style={{color: "black"}}>Skill 2</Form.Label>*/}
                                {/*                <Form.Control*/}
                                {/*                    required*/}
                                {/*                    type="text"*/}
                                {/*                    placeholder="Skill 2"*/}
                                {/*                />*/}

                                {/*                <Form.Label style={{color: "black"}}>Skill 3</Form.Label>*/}
                                {/*                <Form.Control*/}
                                {/*                    type="text"*/}
                                {/*                    placeholder="(Optional)"*/}
                                {/*                />*/}

                                {/*                <Form.Label style={{color: "black"}}>Skill 4</Form.Label>*/}
                                {/*                <Form.Control*/}
                                {/*                    type="text"*/}
                                {/*                    placeholder="(Optional)"*/}
                                {/*                />*/}

                                {/*                <Form.Label style={{color: "black"}}>Skill 5</Form.Label>*/}
                                {/*                <Form.Control*/}
                                {/*                    type="text"*/}
                                {/*                    placeholder="(Optional)"*/}
                                {/*                />*/}
                                {/*                <Container className="mt-3">*/}
                                {/*                    <Button*/}
                                {/*                        style={{border: "2px solid black", backgroundColor: "white", padding: "1rem 7rem", borderRadius: "10px", cursor: "pointer", color: "black"}}*/}
                                {/*                        disabled={!validEmail || !validPwdMatch || !validPwdMatch}*/}
                                {/*                        onClick={showPage4}*/}
                                {/*                    >*/}
                                {/*                        Next*/}
                                {/*                        <Gr.GrLinkNext />*/}
                                {/*                    </Button>*/}
                                {/*                </Container>*/}
                                {/*            </Form.Group>*/}
                                {/*        </Row>*/}
                                {/*    </Container>*/}
                                {/*</Form>*/}

                                {/*<Form>*/}
                                {/*    <Container>*/}
                                {/*        <Row>*/}
                                {/*            <Form.Group as={Col} md={"3"}></Form.Group>*/}
                                {/*            <Form.Group as={Col} md="6" hidden={page4}>*/}
                                {/*                <Form.Label style={{color: "black"}}>Phone number</Form.Label>*/}
                                {/*                <Form.Control*/}
                                {/*                    type="text"*/}
                                {/*                    placeholder="(Optional)"*/}
                                {/*                />*/}

                                {/*                <Form.Label style={{color: "black"}}>Discord</Form.Label>*/}
                                {/*                <Form.Control*/}
                                {/*                    type="text"*/}
                                {/*                    placeholder="(Optional)"*/}
                                {/*                    onChange={(e) => setDiscord(e.target.value)}*/}
                                {/*                    value={discord}*/}
                                {/*                />*/}
                                {/*            </Form.Group>*/}

                                {/*            <Container className="mt-3">*/}
                                {/*                <Button style={{border: "none", backgroundColor: "black", padding: "1rem 7rem", borderRadius: "10px", cursor: "pointer", color: "white"}} hidden>Register</Button>*/}
                                {/*                <p className="mt-3">Already have an account? <a href="#">Log in.</a></p>*/}
                                {/*            </Container>*/}
                                {/*        </Row>*/}
                                {/*    </Container>*/}
                                {/*</Form>*/}
                            </Container>
                        </Tab>
                    </Tabs>
            </Container>

            <Footer />
        </Container>
    )
}

export default LandingPage;