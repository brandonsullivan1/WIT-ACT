import React, { useState } from "react";
import {Container, Form, Button, Card} from "react-bootstrap";

export const Skills = () => {

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
                        <Form>
                            <Form.Group>
                                <Form.Label>General Skill: (current registered general skill)</Form.Label>
                                <Form.Select></Form.Select>
                            </Form.Group>
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
                        <Form>
                            <Form.Group>
                                <Form.Label>Skill Focus: (current registered skill focus)</Form.Label>
                                <Form.Select></Form.Select>
                            </Form.Group>
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
                    <Card.Title className="mt-3">Specific Skills</Card.Title>
                    <Card.Body>
                        <Button>Add specific skills</Button>
                        <Form hidden={true}>
                            <Form.Group>
                                <Form.Label>Skill 1:</Form.Label>
                                <Form.Control/>
                            </Form.Group>

                            <Form.Group hidden={true}>
                                <Form.Label>Skill 2: </Form.Label>
                                <Form.Control/>
                            </Form.Group>

                            <Form.Group hidden={true}>
                                <Form.Label>Skill 3: </Form.Label>
                                <Form.Control/>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Card>
        </Container>
    );
}

export default Skills;