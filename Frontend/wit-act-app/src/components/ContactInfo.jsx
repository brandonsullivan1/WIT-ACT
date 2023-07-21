import React, { useState } from "react";
import {Container, Form, Button, Card} from "react-bootstrap";

export const ContactInfo = () => {

    return (
        <Container>
            <Card>
                <Card.Title className="mt-3">Contact Information</Card.Title>

                <Card style={{
                    borderBottom: "none",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTopRightRadius: "0",
                    borderTopLeftRadius: "0"
                }}>
                    <Card.Title className="mt-3">Phone Number:</Card.Title>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control/>
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
                    <Card.Title className="mt-3">Discord</Card.Title>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Discord:</Form.Label>
                                <Form.Control/>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Card>
        </Container>
    );
}

export default ContactInfo;