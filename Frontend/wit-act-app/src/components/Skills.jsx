import React, { useState } from "react";
import {Container, Form, Button, Card} from "react-bootstrap";
import {SKILLS} from "../Validation/FormValidation";

export const Skills = () => {

    const [generalSkillFormHidden, setGeneralSkillFormHidden] = useState(true);
    const [skillsFocusFormHidden, setSkillsFocusFormHidden] = useState(true);
    const [specificSkillFormHidden, setSpecificSkillFormHidden] = useState(true);

    // initialize to user's current registered skill for all
    const [generalSkill, setGeneralSkill] = useState('Select general skill...');
    const [skillsFocus, setSkillsFocus] = useState('Select skill focus...');
    const [specSkill1, setSpecSkill1] = useState('Select specific skill...');
    const [specSkill2, setSpecSkill2] = useState('Select specific skill...');
    const [specSkill3, setSpecSkill3] = useState('Select specific skill...');

    // default to false if user has skill registered
    const [specSkill2Hidden, setSpecSkill2Hidden] = useState(true);
    const [specSkill3Hidden, setSpecSkill3Hidden] = useState(true);

    const updateGeneralSkill = () => {
        // add connection to DB
        // update general skill
    }

    const updateSkillFocus = () => {
        // add connection to DB
        // update skill focus
    }

    const updateSpecificSkills = () => {
        // add connection to DB
        // update all specifics skills
    }

    const generalSkillForm = () => {
        const btn = document.getElementById('genSkillBtn');

        if (generalSkillFormHidden) {
            setGeneralSkillFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white"
        } else {
            setGeneralSkillFormHidden(true);
            btn.style.color = "white";
            btn.style.backgroundColor = "black"
        }
    }

    const skillsFocusForm = () => {
        const btn = document.getElementById('skillsFocusBtn');

        if (skillsFocusFormHidden) {
            setSkillsFocusFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white"
        } else {
            setSkillsFocusFormHidden(true);
            btn.style.color = "white";
            btn.style.backgroundColor = "black"
        }
    }

    const specificSkillForm = () => {
        const btn = document.getElementById('specSkillBtn');

        if (specificSkillFormHidden) {
            setSpecificSkillFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white"
        } else {
            setSpecificSkillFormHidden(true);
            btn.style.color = "white";
            btn.style.backgroundColor = "black"
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
                    <Card.Title className="mt-3">General Skill</Card.Title>
                    <Card.Body>
                        <Button style={{
                            border: "2px solid black",
                            backgroundColor: "black",
                            padding: "1rem 1rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "white",
                            width: "60%",
                        }} onClick={generalSkillForm} id="genSkillBtn">Update General Skill</Button>
                        <Form hidden={generalSkillFormHidden} className="mt-3">
                            <Form.Group>
                                <Form.Label><strong>General Skill:</strong> {generalSkill}</Form.Label>
                                <Form.Select
                                    required

                                >
                                    {Object.keys(SKILLS).map((availableGeneralSkill, idx) => {
                                        return (
                                          <option key={idx}>{availableGeneralSkill}</option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Container className="mt-3">
                                <Button style={{
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

                <Card style={{
                    borderBottom: "none",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTopRightRadius: "0",
                    borderTopLeftRadius: "0"
                }}>
                    <Card.Title className="mt-3">Skills Focus</Card.Title>
                    <Card.Body>
                        <Button style={{
                            border: "2px solid black",
                            backgroundColor: "black",
                            padding: "1rem 1rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "white",
                            width: "60%",
                        }} onClick={skillsFocusForm} id="skillsFocusBtn">Update Focus Skill</Button>
                        <Form hidden={skillsFocusFormHidden} className="mt-3">
                            <Form.Group>
                                <Form.Label><strong>Skill Focus:</strong> {skillsFocus}</Form.Label>
                                <Form.Select>
                                    {Object.keys(SKILLS[generalSkill]).map((availableSkillFocus, idx) => {
                                        return (
                                            <option key={idx}>{availableSkillFocus}</option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Container className="mt-3">
                                <Button style={{
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

                <Card style={{
                    borderBottom: "none",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTopRightRadius: "0",
                    borderTopLeftRadius: "0"
                }}>
                    <Card.Title className="mt-3">Specific Skill</Card.Title>
                    <Card.Body>
                        <Button style={{
                            border: "2px solid black",
                            backgroundColor: "black",
                            padding: "1rem 1rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "white",
                            width: "60%",
                        }} onClick={specificSkillForm} id="specSkillBtn">Update Specific Skill</Button>
                        <Form hidden={specificSkillFormHidden} className="mt-3">
                            <Form.Group>
                                <Form.Label><strong>Specific Skill:</strong> {specSkill1}</Form.Label>
                                <Form.Select
                                    required
                                >
                                    {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                                        return (
                                            <option key={idx}>{availableSpecificSkill}</option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group hidden={specSkill2Hidden}>
                                <Form.Label><strong>Specific Skill:</strong> {specSkill1}</Form.Label>
                                <Form.Select
                                    required
                                >
                                    {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                                        return (
                                            <option key={idx}>{availableSpecificSkill}</option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group hidden={specSkill3Hidden}>
                                <Form.Label><strong>Specific Skill:</strong> {specSkill1}</Form.Label>
                                <Form.Select
                                    required
                                >
                                    {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                                        return (
                                            <option key={idx}>{availableSpecificSkill}</option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Container className="mt-3">
                                <Button style={{
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