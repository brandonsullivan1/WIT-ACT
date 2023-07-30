import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Container, Dropdown, Form, ListGroup, ListGroupItem, ProgressBar, Row} from "react-bootstrap";
import {EMAIL_REGEX, NAME_REGEX, PHONE_NUMBER_REGEX, PWD_REGEX, SKILLS, TAGS} from "../Validation/FormValidation";
import {useNavigate} from "react-router-dom";
import {Typeahead} from "react-bootstrap-typeahead";

export const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({});
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

    const [generalSkill, setGeneralSkill] = useState('');
    const [skillsFocus, setSkillsFocus] = useState('');
    const [specificSkill1, setSpecificSkill1] = useState('');
    const [specificSkill2, setSpecificSkill2] = useState('');
    const [specificSkill3, setSpecificSkill3] = useState('');

    const [specSkill2Hidden, setSpecSkill2Hidden] = useState(true);
    const [specSkill3Hidden, setSpecSkill3Hidden] = useState(true);

    const [tag, setTag] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);

    const [discord, setDiscord] = useState('');

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

    const changeGenSkill = (selected) => {
        setField('generalSkill', selected && selected[0]);

         if (form.generalSkill) setGeneralSkill(form.generalSkill);
    }

    const changeSkillFocus = (selected) => {
        setField('skillsFocus', selected && selected[0]);
        if (form.skillsFocus) setSkillsFocus(form.skillsFocus);
    }

    const changeSpecSkill1 = (selected) => {
        setField('specificSkill1', selected && selected[0]);
        if (form.specificSkill1) setSpecificSkill1(form.specificSkill1);
        setSpecSkill2Hidden(false);
    }

    const changeSpecSkill2 = (selected) => {
        setField('specificSkill2', selected && selected[0]);
        setSpecSkill3Hidden(false);
    }

    const changeSpecSkill3 = (selected) => {
        setField('specificSkill3', selected && selected[0]);
    }

    const changeTag = (selected) => {
        setField('tag', selected && selected[0]);
    }

    useEffect(() => {
        const result = EMAIL_REGEX.test(form.email);
        setValidEmail(result);
    }, [form.email])

    useEffect(() => {
        const result = PWD_REGEX.test(form.password);
        setValidPwd(result);
    }, [form.password])

    useEffect(() => {
        const result = form.password === form.confirmPassword;
        setValidPwdMatch(result);
    }, [form.password, form.confirmPassword])

    useEffect(() => {
        const result = NAME_REGEX.test(form.name);
        setValidName(result);
    }, [form.name])

    useEffect(() => {
        if (phoneNumber !== '') {
            const result = PHONE_NUMBER_REGEX.test(form.phoneNumber);
            setValidPhoneNumber(result);
        }
    }, [form.phoneNumber])

    const validateForm = () => {
        const {
            email,
            password,
            confirmPassword,
            name,
            generalSkill,
            skillsFocus,
            specificSkill1,
            phoneNumber,
        } = form;

        const newErrors = {};

        if (!email || !validEmail || email === '') newErrors.email = 'Please enter a valid WIT email.';
        if (!password || !validPwd) newErrors.password = 'Please enter a valid password. 8-24 characters, at least 1 uppercase, at least 1 lowercase, at least 1 number, and at least 1 special character (!, @, #, $, %)';
        if (!confirmPassword || !validPwdMatch) newErrors.confirmPassword = 'Passwords must be the same.';
        if (!name || !validName || name === '') newErrors.name = 'Please enter a valid name';
        if (!generalSkill || generalSkill === '') newErrors.generalSkill = 'Please select a general skill';
        if (!skillsFocus || skillsFocus === '') newErrors.skillsFocus = 'Please select a skills focus';
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
    }
    return <Form noValidate validated={registerValidated} onSubmit={handleSubmit}>
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
                                onChange={(e) => setField('email', e.target.value)}
                                value={form.email}
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
                                onChange={(e) => setField('password', e.target.value)}
                                value={form.password}
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
                                onChange={(e) => setField('confirmPassword', e.target.value)}
                                value={form.confirmPassword}
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
                            }}>Next</Button>
                        </Container>
                    </Container>

                    <Container className="mt-3" hidden={registerPage2Hidden}>
                        <Container>
                            <Form.Group controlId="major">
                                <Form.Label style={{color: "black"}}>Full Name</Form.Label>
                                <Form.Control
                                    required={true}
                                    style={{color: "black"}}
                                    onChange={(e) => setField('name', e.target.value)}
                                    value={form.name}
                                    placeholder="Full name"
                                    isInvalid={!!errors.name}
                               />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="generalSkill">
                                <Form.Label style={{color: "black"}}>General Skill</Form.Label>
                                <Typeahead
                                    id="generalSkill"
                                    name="generalSkill"
                                    className={!!errors.generalSkill && 'red-border'}
                                    placeholder="Select general skill..."
                                    inputProps={{required: true}}
                                    onChange={changeGenSkill}
                                    value={form.generalSkill}
                                    options={Object.keys(SKILLS)}
                                />
                                <Container className="red">{errors.generalSkill}</Container>
                            </Form.Group>

                            <Form.Group controlId="skillFocus">
                                <Form.Label style={{color: "black"}}>Skill Focus</Form.Label>
                                <Typeahead
                                    id="skillFocus"
                                    name="skillFocus"
                                    className={!!errors.skillsFocus && 'red-border'}
                                    placeholder="Select skill focus..."
                                    inputProps={{required: true}}
                                    options={Object.keys(SKILLS[generalSkill])}
                                    value={form.skillsFocus}
                                    onChange={changeSkillFocus}
                                />
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
                                        }}>Next</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Container>
                    </Container>

                    <Container className="mt-3" hidden={registerPage3Hidden}>
                        <Form.Group controlId="specificSkill1">
                            <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                            <Typeahead
                                id="specificSkill1"
                                name="specificSkill1"
                                className={!!errors.specificSkill1 && 'red-border'}
                                placeholder="Select general skill..."
                                inputProps={{required: true}}
                                onChange={changeSpecSkill1}
                                value={form.specificSkill1}
                                options={SKILLS[generalSkill][skillsFocus]}
                            />
                            <Container className="red">{errors.specificSkill1}</Container>
                        </Form.Group>

                        <Form.Group controlId="specificSkill2" hidden={specSkill2Hidden}>
                            <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                            <Typeahead
                                id="specificSkill2"
                                name="specificSkill2"
                                className={!!errors.specificSkill2 && 'red-border'}
                                placeholder="Select general skill..."
                                onChange={changeSpecSkill2}
                                value={form.specificSkill2}
                                options={SKILLS[generalSkill][skillsFocus]}
                            />
                        </Form.Group>

                        <Form.Group controlId="specificSkill3" hidden={specSkill3Hidden}>
                            <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                            <Typeahead
                                id="specificSkill3"
                                name="specificSkill3"
                                className={!!errors.specificSkill3 && 'red-border'}
                                placeholder="Select general skill..."
                                onChange={changeSpecSkill3}
                                value={form.specificSkill3}
                                options={SKILLS[generalSkill][skillsFocus]}
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
                        <Form.Group controlId="phoneNumber">
                            <Form.Label style={{color: "black"}}>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="(Optional)"
                                onChange={(e) => setField('phoneNumber', e.target.value)}
                                value={form.phoneNumber}
                                isInvalid={!!errors.phoneNumber}
                            />
                        </Form.Group>

                        <Form.Group controlId="discord">
                            <Form.Label style={{color: "black"}}>Discord</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="(Optional)"
                                onChange={(e) => setField('discord', e.target.value)}
                                value={form.discord}
                                isInvalid={!!errors.discord}
                            />
                        </Form.Group>

                        <Form.Group controlId="tagValidation">
                            <Form.Label style={{color: "black"}}>Skill Tag</Form.Label>
                            <Typeahead
                                id="tag"
                                name="tag"
                                onChange={changeTag}
                                className={!!errors.tag && 'red-border'}
                                placeholder="Select tag..."
                                options={TAGS}
                                isInvalid={!!errors.tag}
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
}

export default Register;