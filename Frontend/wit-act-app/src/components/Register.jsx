import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Container, Dropdown, Form, ListGroup, ListGroupItem, ProgressBar, Row} from "react-bootstrap";
import {EMAIL_REGEX, NAME_REGEX, PHONE_NUMBER_REGEX, PWD_REGEX, SKILLS, TAGS} from "../Validation/FormValidation";
import {useNavigate} from "react-router-dom";
import {Typeahead} from "react-bootstrap-typeahead";

export const Register = () => {
    const navigate = useNavigate();

    const [registerValidated, setRegisterValidated] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [pwdMatch, setPwdMatch] = useState('');
    const [validPwdMatch, setValidPwdMatch] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [generalSkill, setGeneralSkill] = useState('Select general skill...');
    const [skillsFocus, setSkillsFocus] = useState('Select skills focus...');
    const [specificSkill1, setSpecificSkill1] = useState('Select specific skill...');
    const [specificSkill2, setSpecificSkill2] = useState('Select specific skill...');
    const [specificSkill3, setSpecificSkill3] = useState('Select specific skill...');

    const [specSkill2Hidden, setSpecSkill2Hidden] = useState(true);
    const [specSkill3Hidden, setSpecSkill3Hidden] = useState(true);

    const [tag, setTag] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);

    const [discord, setDiscord] = useState('');

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        generalSkill: '',
        skillsFocus: '',
        specificSkill1: '',
        specificSkill2: '',
        specificSkill3: '',
        phoneNumber: '',
        discord: '',
        tag: '',
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


    const [registerPage1Hidden, setRegisterPage1Hidden] = useState(false);
    const [registerPage2Hidden, setRegisterPage2Hidden] = useState(true);
    const [registerPage3Hidden, setRegisterPage3Hidden] = useState(true);
    const [registerPage4Hidden, setRegisterPage4Hidden] = useState(true);

    const [progressBarState, setProgressBarState] = useState(0);

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

    useEffect(() => {
        if (specificSkill1 === 'Select specific skill...') {
            setSpecSkill2Hidden(true);
            setSpecSkill3Hidden(true);
        }
    }, [specificSkill1])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPwd(result);
    }, [password])

    useEffect(() => {
        const result = password === pwdMatch;
        setValidPwdMatch(result);
    }, [password, pwdMatch])

    useEffect(() => {
        const result = NAME_REGEX.test(name);
        setValidName(result);
    }, [name])

    useEffect(() => {
        if (phoneNumber !== '') {
            const result = PHONE_NUMBER_REGEX.test(form.phoneNumber);
            setValidPhoneNumber(result);
        }
    }, [phoneNumber])

    const validateForm = () => {
        const {
            email,
            password,
            confirmPassword,
            name,
            generalSkill,
            skillsFocus,
            specificSkill1,
        } = form;

        const newErrors = {};

        if (!email || !validEmail || email === '') newErrors.email = 'Please enter a valid WIT email.';
        if (!password || !validPwd) newErrors.password = 'Please enter a valid password. 8-24 characters, at least 1 uppercase, at least 1 lowercase, at least 1 number, and at least 1 special character (!, @, #, $, %)';
        if (!confirmPassword || !validPwdMatch) newErrors.confirmPassword = 'Passwords must be the same.';
        if (!name || !validName || name === '') newErrors.name = 'Please enter a valid name';
        if (!generalSkill || generalSkill === 'Select a general skill...') newErrors.generalSkill = 'Please select a general skill';
        if (!skillsFocus || skillsFocus === '') newErrors.skillsFocus = 'Please select a skills focus';
        if (!validPhoneNumber) newErrors.phoneNumber = 'Please enter a valid phone number.';
        if (!specificSkill1 || specificSkill1 === '') newErrors.specificSkill1 = 'Please select a specific skill';

        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();

        if (Object.keys(formErrors). length > 0) {
            setErrors(formErrors);
        } else{
            setRegisterValidated(true);
            navigate('/');
        }

        console.log(form);
    }
    return <Form noValidate validated={registerValidated} onSubmit={handleSubmit} id="registerForm">
        <Container>
            <Row>
                <Col md="3"></Col>
                <Col md="6">

                    <ProgressBar className="mt-1" now={progressBarState}/>

                    <Container className="mt-3" hidden={registerPage1Hidden}>
                        <Form.Group controlId="email">
                            <Form.Label style={{color: "black"}}>Email</Form.Label>
                            <Form.Control
                                required={true}
                                type="text"
                                placeholder="email@wit.edu"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setField('email', email);
                                }}
                                value={email}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="pwd">
                            <Form.Label style={{color: "black"}}>Password</Form.Label>
                            <Form.Control
                                required={true}
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setField('password', password);
                                }}
                                value={password}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="confirmPwd">
                            <Form.Label style={{color: "black"}}>Confirm Password</Form.Label>
                            <Form.Control
                                required={true}
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => {
                                    setPwdMatch(e.target.value);
                                    setField('confirmPassword', pwdMatch);
                                }}
                                value={pwdMatch}
                                isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>

                        <Container className="mt-3">
                            <Button onClick={page2} style={{
                                border: "2px solid black",
                                backgroundColor: "white",
                                padding: "1rem 7rem",
                                borderRadius: "10px",
                                cursor: "pointer",
                                color: "black"
                            }}
                                disabled={!validEmail || !validPwd || !validPwdMatch}
                            >Next</Button>
                        </Container>
                    </Container>

                    <Container className="mt-3" hidden={registerPage2Hidden}>
                        <Container>
                            <Form.Group controlId="major">
                                <Form.Label style={{color: "black"}}>Full Name</Form.Label>
                                <Form.Control
                                    required={true}
                                    style={{color: "black"}}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setField('name', name);
                                    }}
                                    value={name}
                                    placeholder="Full name"
                                    isInvalid={!!errors.name}
                               />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="generalSkill">
                                <Form.Label style={{color: "black"}}>General Skill</Form.Label>
                                <Form.Select
                                    id="generalSkill"
                                    name="generalSkill"
                                    className={!!errors.generalSkill && 'red-border'}
                                    required={true}
                                    onChange={(e) => {
                                        setGeneralSkill(e.target.value);
                                        setField('generalSkill', e.target.value);
                                    }}
                                    value={generalSkill}
                                >
                                {Object.keys(SKILLS).map((availableGeneralSkill, idx) => {
                                    return (
                                      <option key={idx} value={availableGeneralSkill}>{availableGeneralSkill}</option>
                                    );
                                })}
                                </Form.Select>
                                <Container className="red">{errors.generalSkill}</Container>
                            </Form.Group>

                            <Form.Group controlId="skillFocus">
                                <Form.Label style={{color: "black"}}>Skill Focus</Form.Label>
                                <Form.Select
                                    id="skillFocus"
                                    name="skillFocus"
                                    className={!!errors.skillsFocus && 'red-border'}
                                    required={true}
                                    value={skillsFocus}
                                    onChange={(e) => {
                                        setSkillsFocus(e.target.value);
                                        setField('skillsFocus', e.target.value);
                                        // setSpecificSkill1('Select specific skill...');
                                        // setField('specificSkill1', specificSkill1);
                                    }}
                                >
                                    {Object.keys(SKILLS[generalSkill]).map((availableSkillsFocus, idx) => {
                                        return (
                                            <option key={idx} value={availableSkillsFocus}>{availableSkillsFocus}</option>
                                        );
                                    })}
                                </Form.Select>
                                <Container className="red">{errors.skillsFocus}</Container>
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
                                        }}
                                            disabled={!validName || !generalSkill || !skillsFocus}
                                        >Next</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Container>
                    </Container>

                    <Container className="mt-3" hidden={registerPage3Hidden}>
                        <Form.Group controlId="specificSkill1">
                            <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                            <Form.Select
                                id="specificSkill1"
                                name="specificSkill1"
                                className={!!errors.specificSkill1 && 'red-border'}
                                required={true}
                                onChange={(e) => {
                                    setSpecificSkill1(e.target.value);
                                    setField('specificSkill1', e.target.value);
                                    setSpecSkill2Hidden(false);
                                }}
                                value={specificSkill1}
                            >
                                {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                                    return (
                                      <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                                    );
                                })}
                            </Form.Select>
                            <Container className="red">{errors.specificSkill1}</Container>
                        </Form.Group>

                        <Form.Group controlId="specificSkill2" hidden={specSkill2Hidden}>
                            <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                            <Form.Select
                                id="specificSkill2"
                                name="specificSkill2"
                                className={!!errors.specificSkill2 && 'red-border'}
                                onChange={(e) => {
                                    setSpecificSkill2(e.target.value);
                                    setField('specificSkill2', e.target.value);
                                    setSpecSkill3Hidden(false);
                                }}
                                value={specificSkill1}
                            >
                                {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                                    return (
                                        <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="specificSkill3" hidden={specSkill3Hidden}>
                            <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                            <Form.Select
                                id="specificSkill3"
                                name="specificSkill3"
                                className={!!errors.specificSkill3 && 'red-border'}
                                onChange={(e) => {
                                    setSpecificSkill3(e.target.value);
                                    setField('specificSkill3', e.target.value);
                                }}
                                value={specificSkill3}
                            >
                                {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                                    return (
                                        <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                                    );
                                })}
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
                                    }}
                                        disabled={!specificSkill1}
                                    >Next</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Container>

                    <Container className="mt-3" hidden={registerPage4Hidden}>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label style={{color: "black"}}>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="(Optional)"
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                    setField('phoneNumber', e.target.value);
                                }}
                                value={phoneNumber}
                                isInvalid={!!errors.phoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="discord">
                            <Form.Label style={{color: "black"}}>Discord</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="(Optional)"
                                onChange={(e) => {
                                    setDiscord(e.target.value)
                                    setField('discord', e.target.value);
                                }}
                                value={discord}
                                isInvalid={!!errors.discord}
                            />
                        </Form.Group>

                        <Form.Group controlId="tagValidation">
                            <Form.Label style={{color: "black"}}>Tag</Form.Label>
                            <Form.Select
                                id="tag"
                                name="tag"
                                onChange={(e) => {
                                    setTag(e.target.value);
                                    setField('tag', e.target.value);
                                }}
                                className={!!errors.tag && 'red-border'}
                                value={tag}
                                isInvalid={!!errors.tag}
                            >
                                {TAGS.map((availableTag, idx) => {
                                    return (
                                        <option key={idx} value={availableTag}>{availableTag}</option>
                                    );
                                })}
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
                                    }} onClick={handleSubmit}>Register</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </Col>
            </Row>
        </Container>
    </Form>
}

export default Register;