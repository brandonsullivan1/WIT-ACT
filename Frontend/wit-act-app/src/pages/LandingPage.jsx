import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Button, Col, Container, Form, Row, Tab, Tabs, Dropdown} from 'react-bootstrap';
import {EMAIL_REGEX, PHONE_NUMBER_REGEX, PWD_REGEX, VALID_MAJORS, VALID_MINORS, NAME_REGEX} from "../Validation/FormValidation";
import { Footer } from "../components/Footer";

export const LandingPage = () => {
    const [loginValidated, setLoginValidated] = useState(false);
    const [registrationValidated, setRegistrationValidated] = useState(false);

    const navigate = useNavigate();

    // Login Section

    const [userEmail, setUserEmail] = useState('');
    const [validUserEmail, setValidUserEmail] = useState(false);

    const [userPwd, setUserPwd] = useState('');
    const [validUserPwd, setValidUserPwd] = useState(false);

    // test user email validity
    useEffect(() => {
        // check if email is in database
    }, [userEmail])

    // test user password validity
    useEffect(() => {
        // check if password matches password in database stored by user's email
    }, [userPwd])

    const handleLoginSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setLoginValidated(true);
        navigate('/verification');
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

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [pwdMatch, setPwdMatch] = useState('');
    const [validPwdMatch, setValidPwdMatch] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);

    const [discord, setDiscord] = useState('');

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

        setRegistrationValidated(true);
    }

    return (
        <Container>
            <Container style={{border: "1px solid white", padding: "0", borderRadius: "7px", justifyContent: "center", alignItems: "center"}}>
                    <Tabs defaultActiveKey="login" fill justify style={{width: "100%"}}>
                        <Tab eventKey="login" title="Login">
                            <Container>
                                <Form noValidate validated={loginValidated} onSubmit={handleLoginSubmit}>
                                        <Container>
                                            <Form.Group controlId="loginValidation">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    required
                                                    tyoe="email"
                                                    placeholder="email@wit.edu"
                                                    autoComplete="off"
                                                    onChange={(e) => setUserEmail(e.target.value)}
                                                    value={userEmail}
                                                />
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    required
                                                    tyoe="password"
                                                    placeholder="Password"
                                                    autoComplete="off"
                                                    onChange={(e) => setUserPwd(e.target.value)}
                                                    value={userPwd}
                                                />
                                            </Form.Group>
                                        </Container>
                                    <Container className="mt-3">
                                        <Button type="submit" disabled={userEmail === '' || userPwd === ''} style={{border: "none", backgroundColor: "white", padding: "1rem 9rem", borderRadius: "10px", cursor: "pointer", color: "black"}}>Login</Button>
                                        <p className="mt-3">Don't have an account? <a href='#'>Register here.</a></p>
                                    </Container>
                                </Form>
                            </Container>
                        </Tab>
                        <Tab eventKey="register" title="Register">
                            <Container>
                                <Form>
                                    <Container>
                                        <Row>
                                            <Form.Group as={Col} md="4" controlId="registerValidation">
                                                <Form.Label>Full name</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Full name"
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    aria-invalid={validName ? "false" : "true"}
                                                />
                                                <Form.Label></Form.Label>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="registerValidation">
                                                <Form.Label>Major</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Major"
                                                    onChange={(e) => setMajor(e.target.value)}
                                                    value={major}
                                                    aria-invalid={validMajor ? "false" : "true"}
                                                />
                                                <Form.Label></Form.Label>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="registerValidation">
                                                <Form.Label>Minor</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Minor"
                                                    onChange={(e) => setMinor(e.target.value)}
                                                    value={minor}
                                                    aria-invalid={validMinor ? "false" : "true"}
                                                />
                                                <Form.Label></Form.Label>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="registerValidation">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="email"
                                                    placeholder="email@wit.edu"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                    aria-invalid={validEmail ? "false" : "true"}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="registerValidation">
                                                <Form.Label>Skill 1</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Skill 1"
                                                    onChange={(e) => setSkills(e.target.value)}
                                                    value={skills}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="registerValidation">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    placeholder="Password"
                                                    onChange={(e) => setPwd(e.target.value)}
                                                    value={pwd}
                                                    aria-invalid={validPwd ? "false" : "true"}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="registerValidation">
                                                <Form.Label>Skill 2</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Skill 2"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="registerValidation">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    placeholder="Password"
                                                    onChange={(e) => setPwdMatch(e.target.value)}
                                                    value={pwdMatch}
                                                    aria-invalid={validPwdMatch ? "false" : "true"}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="registerValidation">
                                                <Form.Label>Skill 3</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="(Optional)"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="registerValidation">
                                                <Form.Label>Phone number</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="(Optional)"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="registerValidation">
                                                <Form.Label>Skill 4</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="(Optional)"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="registerValidation">
                                                <Form.Label>Discord</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="username"
                                                    onChange={(e) => setDiscord(e.target.value)}
                                                    value={discord}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="registerValidation">
                                                <Form.Label>Skill 5</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="(Optional)"
                                                />
                                            </Form.Group>
                                        </Row>
                                    </Container>
                                    <Container className="mt-3">
                                        <Button style={{border: "none", backgroundColor: "white", padding: "1rem 7rem", borderRadius: "10px", cursor: "pointer", color: "black"}}>Register</Button>
                                        <p className="mt-3">Already have an account? <a href="#">Log in.</a></p>
                                    </Container>
                                </Form>
                            </Container>
                        </Tab>
                    </Tabs>
            </Container>

            <Footer />
        </Container>
    )
}

export default LandingPage;