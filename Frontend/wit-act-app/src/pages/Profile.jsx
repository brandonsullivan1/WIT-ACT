import React, { useState } from "react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import Footer from "../components/Footer";
import { Container, Card, Col, Row, Button, ListGroup, Form } from "react-bootstrap";
import { Account } from "../components/Account";
import { Skills } from "../components/Skills";
import { ContactInfo } from "../components/ContactInfo";

export const Profile = () => {



    return (
        <Container className="d-flex flex-column min-vh-100 mw-100" style={{padding: "0", margin: "0"}}>
            <ResponsiveNavbar />

            <Container className="auth-form-container" style={{backgroundColor: "white"}}>
                <Row>
                    <Col md={4}>
                        <ListGroup as="ul">
                            <ListGroup.Item>Account</ListGroup.Item>
                            <ListGroup.Item>Skills</ListGroup.Item>
                            <ListGroup.Item>Contact Information</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Title>Profile</Card.Title>
                            <Card.Body>
                                <Card.Text>Email: student@wit.edu</Card.Text>
                                <Form>
                                    <Form.Label>Update Password:</Form.Label>
                                    <Form.Control></Form.Control>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </Container>
    )
}

export default Profile;