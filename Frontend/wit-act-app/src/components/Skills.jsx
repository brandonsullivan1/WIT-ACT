import React, {useEffect, useState} from "react";
import {Container, Form, Button, Card} from "react-bootstrap";
import {SKILLS} from "../Validation/FormValidation";

/*
    This file contains the necessary form for a user to fill out if
    they wish to change any of the previous registered skills, or they
    can add more skill focuses (up to 3).
 */

export const Skills = () => {

    const [validated, setValidated] = useState(false);

    // pull users current registered skills
    const currentGeneralSkill = 'Select general skill...';
    const currentSkillsFocus = 'Select skills focus...';
    const currentSpecificSkill1 = 'Select specific skill...';
    const currentSpecificSkill2 = 'Select specific skill...';
    const currentSpecificSkill3 = 'Select specific skill...';

    const [newGeneralSkill, setNewGeneralSkill] = useState(currentGeneralSkill);
    const [newSkillsFocus, setNewSkillsFocus] = useState(currentSkillsFocus);
    const [newSpecificSkill1, setNewSpecificSkill1] = useState(currentSpecificSkill1);
    const [newSpecificSkill2, setNewSpecificSkill2] = useState(currentSpecificSkill2);
    const [newSpecificSkill3, setNewSpecificSkill3] = useState(currentSpecificSkill3);

    const [newSpecificSkill2Hidden, setNewSpecificSkill2Hidden] = useState(true);
    const [newSpecificSkill3Hidden, setNewSpecificSkill3Hidden] = useState(true);

    useEffect(() => {
        if (newGeneralSkill === 'Select general skill...') {
            setNewSkillsFocus('Select skills focus...');
            setNewSpecificSkill1('Select specific skill...');
            setNewSpecificSkill2('Select specific skill...');
            setNewSpecificSkill3('Select specific skill...');
        }

        if (newSkillsFocus === 'Select skills focus...') {
            setNewSpecificSkill1('Select specific skill...');
            setNewSpecificSkill2('Select specific skill...');
            setNewSpecificSkill3('Select specific skill...');
        }

        if (newSpecificSkill1 === 'Select specific skill...') {
            setNewSpecificSkill2('Select specific skill...');
            setNewSpecificSkill3('Select specific skill...');
            setNewSpecificSkill2Hidden(true);
            setNewSpecificSkill3Hidden(true);
        }

        if (newSpecificSkill2 === 'Select specific skill...') {
            setNewSpecificSkill3('Select specific skill...');
            setNewSpecificSkill3Hidden(true);
        }
    }, [newGeneralSkill, newSkillsFocus, newSpecificSkill1, newSpecificSkill2])

    const [form, setForm] = useState({
        newGeneralSkill: '',
        newSkillsFocus: '',
        newSpecificSkill1: '',
        newSpecificSkill2: '',
        newSpecificSkill3: '',
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

    const validateForm = () => {
        const {
            newGeneralSkill,
            newSkillsFocus,
            newSpecificSkill1,
            newSpecificSkill2,
            newSpecificSkill3,
        } = form;

        const newErrors = {};

        if (!newGeneralSkill || newGeneralSkill === 'Select general skill...') newErrors.newGeneralSkill = 'Please select a general skill.';
        if (!newSkillsFocus || newSkillsFocus === 'Select skills focus...') newErrors.newSkillsFocus = 'Please select a skills focus.';
        if (!newSpecificSkill1 || newSpecificSkill1 === 'Select specific skill...') newErrors.newSpecificSkill1 = 'Please select a specific skill';
        if (newSpecificSkill2 === newSpecificSkill1) newErrors.newSpecificSkill2 = 'Please select a different specific skill';
        if (newSpecificSkill3 === newSpecificSkill1 || newSpecificSkill3 === newSpecificSkill2) newErrors.newSpecificSkill3 = 'Please select a different specific skill.';

        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setValidated(true);
        }
    }

    return (
        <Container>
            <Card>
                <Card.Title className="mt-3">Skills</Card.Title>

                <Card style={{
                    borderBottom: "none",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTopRightRadius: "0",
                    borderTopLeftRadius: "0"
                }}>
                    <Card.Body>
                        <Form className="mt-3" noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group controlId="generalSkill">
                                <Form.Label><strong>General Skill:</strong> {currentGeneralSkill}</Form.Label>
                                <Form.Select
                                    id="generalSkill"
                                    name="generalSkill"
                                    className={!!errors.newGeneralSkill && 'red-border'}
                                    onChange={(e) => {
                                        setNewGeneralSkill(e.target.value);
                                        setField('newGeneralSkill', e.target.value);
                                        setNewSkillsFocus('Select skills focus...');
                                    }}
                                    value={newGeneralSkill}
                                >
                                    {Object.keys(SKILLS).map((availableGeneralSkill, idx) => {
                                        return (
                                            <option key={idx}
                                                    value={availableGeneralSkill}>{availableGeneralSkill}</option>
                                        );
                                    })}
                                </Form.Select>
                                <Container className="red">{errors.newGeneralSkill}</Container>
                            </Form.Group>

                            <Form.Group controlId="skillsFocus">
                                <Form.Label><strong>Skills Focus:</strong> {currentSkillsFocus}</Form.Label>
                                <Form.Select
                                    id="skillsFocus"
                                    name="skillsFocus"
                                    className={!!errors.newSkillsFocus && 'red-border'}
                                    onChange={(e) => {
                                        setNewSkillsFocus(e.target.value);
                                        setField('newSkillsFocus', e.target.value);
                                    }}
                                    value={newSkillsFocus}
                                >
                                    {currentGeneralSkill === newGeneralSkill ? Object.keys(SKILLS[currentGeneralSkill]).map((availableSkillsFocus, idx) => {
                                        return (
                                            <option key={idx}
                                                    value={availableSkillsFocus}>{availableSkillsFocus}</option>
                                        );
                                    }) : Object.keys(SKILLS[newGeneralSkill]).map((availableSkillsFocus, idx) => {
                                        return (
                                            <option key={idx}
                                                    value={availableSkillsFocus}>{availableSkillsFocus}</option>
                                        );
                                    })}
                                </Form.Select>
                                <Container className="red">{errors.newSkillsFocus}</Container>
                            </Form.Group>

                            <Form.Group controlId="specificSkill1">
                                <Form.Label><strong>Specific Skill:</strong> {currentSpecificSkill1}</Form.Label>
                                <Form.Select
                                    id="specificSkill1"
                                    name="specificSkill1"
                                    className={!!errors.newSpecificSkill1 && 'red-border'}
                                    onChange={(e) => {
                                        setNewSpecificSkill1(e.target.value);
                                        setField('newSpecificSkill1', e.target.value);
                                        setNewSpecificSkill2Hidden(false);
                                    }}
                                    value={newSpecificSkill1}
                                >
                                    {currentSkillsFocus === newSkillsFocus ? SKILLS[currentGeneralSkill][currentSkillsFocus].map((availableSpecificSkill, idx) => {
                                        return (
                                            <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                                        );
                                    }) : SKILLS[newGeneralSkill][newSkillsFocus].map((availableSpecificSkill, idx) => {
                                        return (
                                            <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                                        );
                                    })}
                                </Form.Select>
                                <Container className="red">{errors.newSpecificSkill1}</Container>
                            </Form.Group>

                            <Form.Group controlId="specificSkill2" hidden={newSpecificSkill2Hidden}>
                                <Form.Label><strong>Specific Skill:</strong> {currentSpecificSkill2}</Form.Label>
                                <Form.Select
                                    id="specificSkill2"
                                    name="specificSkill2"
                                    className={!!errors.newSpecificSkill2 && 'red-border'}
                                    onChange={(e) => {
                                        setNewSpecificSkill2(e.target.value);
                                        setField('newSpecificSkill2', e.target.value);
                                        setNewSpecificSkill3Hidden(false);
                                    }}
                                    value={newSpecificSkill2}
                                >
                                    {currentSkillsFocus === newSkillsFocus ? SKILLS[currentGeneralSkill][currentSkillsFocus].map((availableSpecificSkill, idx) => {
                                        return (
                                            <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                                        );
                                    }) : SKILLS[newGeneralSkill][newSkillsFocus].map((availableSpecificSkill, idx) => {
                                        return (
                                            <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                                        );
                                    })}
                                </Form.Select>
                                <Container className="red">{errors.newSpecificSkill2}</Container>
                            </Form.Group>

                            <Form.Group controlId="specificSkill3" hidden={newSpecificSkill3Hidden}>
                                <Form.Label><strong>Specific Skill:</strong> {currentSpecificSkill3}</Form.Label>
                                <Form.Select
                                    id="specificSkill3"
                                    name="specificSkill3"
                                    className={!!errors.newSpecificSkill3 && 'red-border'}
                                    onChange={(e) => {
                                        setNewSpecificSkill3(e.target.value);
                                        setField('newSpecificSkill3', e.target.value);
                                    }}
                                    value={newSpecificSkill3}
                                >
                                    {currentSkillsFocus === newSkillsFocus ? SKILLS[currentGeneralSkill][currentSkillsFocus].map((availableSpecificSkill, idx) => {
                                        return (
                                            <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                                        );
                                    }) : SKILLS[newGeneralSkill][newSkillsFocus].map((availableSpecificSkill, idx) => {
                                        return (
                                            <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                                        );
                                    })}
                                </Form.Select>
                                <Container className="red">{errors.newSpecificSkill3}</Container>
                            </Form.Group>
                            <Container className="mt-3">
                                <Button type="submit" style={{
                                    border: "2px solid black",
                                    backgroundColor: "black",
                                    padding: "1rem 1rem",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    color: "white",
                                    width: "60%",
                                }}
                                >Update</Button>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </Card>
        </Container>
    );
}

export default Skills;