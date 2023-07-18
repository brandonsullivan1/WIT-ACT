import React, {useState} from "react";
import {Button, Col, Container, Form, ListGroup, ListGroupItem, ProgressBar, Row} from "react-bootstrap";
import {VALID_MAJORS, VALID_MINORS} from "../Validation/FormValidation";

export const Register = () => {
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
                                    // isInvalid={email.length === 1 || !validEmail}
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
                                    // isInvalid={!validPwd}
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
                            </Container>
                        </Container>

                        <Container className="mt-3" hidden={registerPage2Hidden}>
                            <Container>
                                <Form.Group controlId="majorValidation">
                                    <Form.Label style={{color: "black"}}>Major</Form.Label>
                                    <Form.Select required style={{color: "black"}} onChange={((e) => setMajor(e.target.value))}>
                                        <option>Select your major...</option>
                                        {VALID_MAJORS.map((availableMajor, idx) => {
                                                return (
                                                    <option key={idx} style={{color: "black"}}>{availableMajor}</option>
                                                );
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="minorValidation">
                                    <Form.Label style={{color: "black"}}>Minor</Form.Label>
                                    <Form.Select style={{color: "black"}} onChange={((e) => setMinor(e.target.value))}>
                                        <option>(Optional) Select your minor...</option>
                                        {VALID_MINORS.map((availableMinor, idx) => {
                                                return (
                                                  <option key={idx}>{availableMinor}</option>
                                                );
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Container>

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
                            <Form.Group controlId="generalSkillValidation">
                                <Form.Label style={{color: "black"}}>General Skill</Form.Label>
                                <Form.Select required style={{color: "black"}} onChange={(e) => setSkill1(e.target.value)}>
                                    <option>Select topic...</option>
                                    <option>Computing and Data Science</option>
                                    <option>Sciences & Humanities</option>
                                    <option>Architecture & Design</option>
                                    <option>Engineering</option>
                                    <option>Management</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="focusValidation">
                                <Form.Label style={{color: "black"}}>Skill Focus</Form.Label>
                                <Form.Select required>
                                    <option>Select focus...</option>
                                </Form.Select>
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
    )
}

export default Register;