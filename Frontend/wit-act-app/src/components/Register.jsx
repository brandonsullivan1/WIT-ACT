import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Container, Dropdown, Form, ListGroup, ListGroupItem, ProgressBar, Row} from "react-bootstrap";
import {EMAIL_REGEX, NAME_REGEX, PWD_REGEX, SKILLS, TAGS} from "../Validation/FormValidation";
import {useNavigate} from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();

    const [registerValidated, setRegisterValidated] = useState(false);

    const emailRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [pwdMatch, setPwdMatch] = useState('');
    const [validPwdMatch, setValidPwdMatch] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [major, setMajor] = useState('');
    const [validMajor, setValidMajor] = useState(false);

    const [minor, setMinor] = useState('');
    const [validMinor, setValidMinor] = useState(false);

    const [generalSkill, setGeneralSkill] = useState('Select general skill...');
    const [skillsFocus, setSkillsFocus] = useState('Select skill focus...');
    const [specificSkill1, setSpecificSkill1] = useState('Select specific skill...');
    const [specificSkill2, setSpecificSkill2] = useState('Select specific skill...');
    const [specificSkill3, setSpecificSkill3] = useState('Select specific skill...');

    const [specSkill2Hidden, setSpecSkill2Hidden] = useState(true);
    const [specSkill3Hidden, setSpecSkill3Hidden] = useState(true);

    const [tag, setTag] = useState('Select tag...');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);

    const [discord, setDiscord] = useState('');
    const [validDiscord, setValidDiscord] = useState(false);

    const [registerPage1Hidden, setRegisterPage1Hidden] = useState(false);
    const [registerPage2Hidden, setRegisterPage2Hidden] = useState(true);
    const [registerPage3Hidden, setRegisterPage3Hidden] = useState(true);
    const [registerPage4Hidden, setRegisterPage4Hidden] = useState(true);
    const [verifyPageHidden, setVerifyPageHidden] = useState(true);

    const [progressBarState, setProgressBarState] = useState(0);

    const page1 = () => {
        setRegisterPage1Hidden(false);
        setRegisterPage2Hidden(true);
        setRegisterPage3Hidden(true);
        setRegisterPage4Hidden(true);
        setVerifyPageHidden(true);
        setProgressBarState(0);
    }

    const page2 = () => {
        setRegisterPage1Hidden(true);
        setRegisterPage2Hidden(false);
        setRegisterPage3Hidden(true);
        setRegisterPage4Hidden(true);
        setVerifyPageHidden(true);
        setProgressBarState(25);
    }

    const page3 = () => {
        setRegisterPage1Hidden(true);
        setRegisterPage2Hidden(true);
        setRegisterPage3Hidden(false);
        setRegisterPage4Hidden(true);
        setVerifyPageHidden(true);
        setProgressBarState(50);
    }

    const page4 = () => {
        setRegisterPage1Hidden(true);
        setRegisterPage2Hidden(true);
        setRegisterPage3Hidden(true);
        setRegisterPage4Hidden(false);
        setVerifyPageHidden(true);
        setProgressBarState(75);
    }

    const changeGenSkill = (e) => {
        setGeneralSkill(e.target.value);
        setSkillsFocus("Select skill focus...");
    }

    const changeSpecSkill1 = (e) => {
        setSpecificSkill1(e.target.value);
        setSpecSkill2Hidden(false);
    }

    const changeSpecSkill2 = (e) => {
        setSpecificSkill2(e.target.value);
        setSpecSkill3Hidden(false);
    }

    const changeSpecSkill3 = (e) => {
        setSpecificSkill3(e.target.value);
    }

    useEffect(() => {
        if (specificSkill1 === "Select specific skill...") {
            setSpecSkill2Hidden(true);
            setSpecSkill3Hidden(true);
        }
    }, [specificSkill1])

    useEffect(() => {
        if (specificSkill2 === "Select specific skill...") {
            setSpecSkill3Hidden(true);
        }
    }, [specificSkill2])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
    }, [pwd])

    useEffect(() => {
        const result = pwd === pwdMatch;
        setValidPwdMatch(result);
    }, [pwd, pwdMatch])

    useEffect(() => {
        const result = NAME_REGEX.test(name);
        setValidName(result);
    }, [name])

    useEffect(() => {
        const result = major !== ("Select your major..." || "");
        setValidMajor(result);
    }, [major])

    useEffect(() => {
        const result = minor !== ("(Optional) Select your minor..." || "");
        setValidMinor(result);
    }, [minor])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (form.checkValidity() === true) {
            setRegisterValidated(true);
            navigate('/');
        }
    }
    return (
        <Form noValidate validated={registerValidated} onSubmit={handleSubmit}>
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
                                    ref={emailRef}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    isInvalid={!validEmail || email.length <= 0}
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <Form.Control.Feedback id="emailValidation" type={validEmail ? "invalid" : "valid"}>{validEmail ? "Please enter a valid email." : "Looks good!"}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="pwdValidation">
                                <Form.Label style={{color: "black"}}>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    isInvalid={!validPwd}
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
                                    isInvalid={!pwdMatch}
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
                                    <Form.Label style={{color: "black"}}>Full Name</Form.Label>
                                    <Form.Control
                                        required
                                        style={{color: "black"}}
                                        onChange={((e) => setName(e.target.value))}
                                        value={name}
                                        placeholder="Full name"
                                        isInvalid={!validName}
                                   />
                                </Form.Group>

                                <Form.Group controlId="generalSkillValidation">
                                    <Form.Label style={{color: "black"}}>General Skill</Form.Label>
                                    <Form.Select
                                        required
                                        style={{color: "black"}}
                                        onChange={changeGenSkill}
                                        value={generalSkill}
                                    >
                                        {Object.keys(SKILLS).map((availableGenSkill, idx) => {
                                                return (
                                                    <option key={idx}>{availableGenSkill}</option>
                                                );
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="focusValidation">
                                    <Form.Label style={{color: "black"}}>Skill Focus</Form.Label>
                                    <Form.Select
                                        required
                                        style={{color: "black"}}
                                        onChange={(e) => setSkillsFocus(e.target.value)}
                                        value={skillsFocus}
                                    >
                                        {Object.keys(SKILLS[generalSkill]).map((availableFocus, idx) => {
                                                return (
                                                    <option key={idx}>{availableFocus}</option>
                                                );
                                            })
                                        }
                                    </Form.Select>
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
                        </Container>

                        <Container className="mt-3" hidden={registerPage3Hidden}>
                            <Form.Group controlId="specSkill1Validaiton">
                                <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                                <Form.Select
                                    required
                                    style={{color: "black"}}
                                    onChange={changeSpecSkill1}
                                    value={specificSkill1}
                                >
                                    {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                                            return (
                                                <option key={idx}>{availableSpecificSkill}</option>
                                            );
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="specSkill2Validation" hidden={specSkill2Hidden}>
                                <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                                <Form.Select
                                    required
                                    style={{color: "black"}}
                                    onChange={changeSpecSkill2}
                                    value={specificSkill2}
                                >
                                    {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                                            return (
                                                <option key={idx}>{availableSpecificSkill}</option>
                                            );
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="specSkill3Validation" hidden={specSkill3Hidden}>
                                <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                                <Form.Select
                                    required
                                    style={{color: "black"}}
                                    onChange={changeSpecSkill3}
                                    value={specificSkill3}
                                >
                                    {Object.keys(SKILLS).map((availableGenSkill, idx) => {
                                        return (
                                            <option key={idx}>{availableGenSkill}</option>
                                        );
                                    })
                                    }
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

                            <Form.Group controlId="tagValidation">
                                <Form.Label style={{color: "black"}}>Skill Tag</Form.Label>
                                <Form.Select
                                    style={{color: "black"}}
                                    onChange={(e) => setTag(e.target.value)}
                                    value={tag}
                                >
                                    {TAGS.map((avialableTag, idx) => {
                                            return (
                                                <option key={idx}>{avialableTag}</option>
                                            );
                                        })
                                    }
                                </Form.Select>
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