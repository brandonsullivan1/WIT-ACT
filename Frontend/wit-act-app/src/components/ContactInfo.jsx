import React, { useState } from "react";
import {Container, Form, Button, Card} from "react-bootstrap";

export const ContactInfo = () => {

    const [phoneFormHidden, setPhoneFormHidden] = useState(true);
    const [discordFormHidden, setDiscordFormHidden] = useState(true);

    // pull user's registered phone number and discord if available and display

    const phoneForm = () => {
        const btn = document.getElementById('phoneBtn');

        if (phoneFormHidden) {
            setPhoneFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white"
        } else {
            setPhoneFormHidden(true);
            btn.style.color = "white";
            btn.style.backgroundColor = "black"
        }
    }

    const discordForm = () => {
        const btn = document.getElementById('discordBtn');

        if (discordFormHidden) {
            setDiscordFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white"
        } else {
            setDiscordFormHidden(true);
            btn.style.color = "white";
            btn.style.backgroundColor = "black"
        }
    }

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
                        <Button style={{
                            border: "2px solid black",
                            backgroundColor: "black",
                            padding: "1rem 1rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "white",
                            width: "60%",
                        }} onClick={phoneForm} id="phoneBtn">Update Phone Number</Button>
                        <Form hidden={phoneFormHidden} className="mt-3">
                            <Form.Group>
                                <Form.Label>Phone Number:</Form.Label>
                                <Form.Control/>
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
                    <Card.Title className="mt-3">Discord</Card.Title>
                    <Card.Body>
                        <Button style={{
                            border: "2px solid black",
                            backgroundColor: "black",
                            padding: "1rem 1rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "white",
                            width: "60%",
                        }} onClick={discordForm} id="discordBtn">Update Discord</Button>
                        <Form hidden={discordFormHidden}>
                            <Form.Group>
                                <Form.Label>Discord:</Form.Label>
                                <Form.Control/>
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

export default ContactInfo;