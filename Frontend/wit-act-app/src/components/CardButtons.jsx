import React, { useState } from "react";
import {Button, Navbar, Container, Modal, Card, ListGroup, Form} from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import { projects } from "../pages/Projects";

export const CardButtons = () => {

    // revise expand a card to show the card's registered info

    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
        if (disliked) setDisliked(false);
    }

    const [disliked, setDisliked] = useState(false);

    const toggleDislike = () => {
        setDisliked(!disliked);
        if (liked) setLiked(false);
    }

    const [showExpandedCard, setShowExpandedCard] = useState(false);

    const openExpandedCard = () => setShowExpandedCard(true);
    const closeExpandedCard = () => setShowExpandedCard(false);

    return (
        <Navbar>
            <Container style={{alignItems: "center", justifyContent: "left"}}>
                <Button onClick={toggleLike}
                        style={{fontSize: "1.5rem", color: "black", background: "none", border: "none"}}>
                    {
                        liked === true ? <AiIcons.AiFillLike onFormSwitch={toggleLike}/> :
                            <AiIcons.AiOutlineLike onFormSwitch={toggleLike}/>
                    }
                </Button>
            </Container>
            <Container style={{alignItems: "center", justifyContent: "center"}}>
                <Button onClick={openExpandedCard}
                        style={{backgroundColor: "#000", border: "1px solid #000"}}>Expand</Button>
                <Modal show={showExpandedCard} onHide={closeExpandedCard} size="lg"
                       aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Stock Price Predictor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card>
                            <Card.Body>
                                <Card.Title>Full Description:</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Control
                                            style={{
                                                margin: "0.5rem 0",
                                                padding: "1rem",
                                                border: "1px solid black",
                                                backgroundColor: "lightgray",
                                                borderRadius: "10px"
                                            }}
                                            defaultValue="Full description"
                                        />
                                    </Form.Group>

                                    <Card.Title className="mt-2">Desired General Skill:</Card.Title>
                                    <Form.Group>
                                        <Form.Control
                                            style={{
                                                margin: "0.5rem 0",
                                                padding: "1rem",
                                                border: "1px solid black",
                                                backgroundColor: "lightgray",
                                                borderRadius: "10px"
                                            }}
                                            defaultValue="General skill"
                                        />
                                    </Form.Group>

                                    <Card.Title className="mt-2">Desired Skill Focus:</Card.Title>
                                    <Form.Group>
                                        <Form.Control
                                            style={{
                                                margin: "0.5rem 0",
                                                padding: "1rem",
                                                border: "1px solid black",
                                                backgroundColor: "lightgray",
                                                borderRadius: "10px"
                                            }}
                                            defaultValue="Skill focus"
                                        />
                                    </Form.Group>

                                    <Card.Title className="mt-2">Desired Specific Skill:</Card.Title>
                                    <Form.Group>
                                        <Form.Control
                                            style={{
                                                margin: "0.5rem 0",
                                                padding: "1rem",
                                                border: "1px solid black",
                                                backgroundColor: "lightgray",
                                                borderRadius: "10px"
                                            }}
                                            defaultValue="Specific skill"
                                        />
                                    </Form.Group>

                                    <Card.Title className="mt-2">Lead Maker:</Card.Title>
                                    <Form.Group>
                                        <Form.Control
                                            style={{
                                                margin: "0.5rem 0",
                                                padding: "1rem",
                                                border: "1px solid black",
                                                backgroundColor: "lightgray",
                                                borderRadius: "10px"
                                            }}
                                            defaultValue="Lead maker"
                                        />
                                    </Form.Group>

                                    <Card.Title className="mt-2">Lead Maker's Email:</Card.Title>
                                    <Form.Group>
                                        <Form.Control
                                            style={{
                                                margin: "0.5rem 0",
                                                padding: "1rem",
                                                border: "1px solid black",
                                                backgroundColor: "lightgray",
                                                borderRadius: "10px"
                                            }}
                                            defaultValue="leadmaker@wit.edu"
                                        />
                                    </Form.Group>
                                </Form>

                                <Card.Title className="mt-2">Other Team Members:</Card.Title>
                                <Card.Text>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item style={{
                                            margin: "0.5rem 0",
                                            padding: "1rem",
                                            border: "1px solid black",
                                            backgroundColor: "lightgray",
                                            borderRadius: "10px"
                                        }} as="li"
                                                        className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Josh Polischuk</div>
                                                polischukj@wit.edu
                                            </Container>
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{
                                            margin: "0.5rem 0",
                                            padding: "1rem",
                                            border: "1px solid black",
                                            backgroundColor: "lightgray",
                                            borderRadius: "10px"
                                        }} as="li"
                                                        className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Team Member 2</div>
                                                (open spot)
                                            </Container>
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{
                                            margin: "0.5rem 0",
                                            padding: "1rem",
                                            border: "1px solid black",
                                            backgroundColor: "lightgray",
                                            borderRadius: "10px"
                                        }} as="li"
                                                        className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Team Member 3</div>
                                                (open spot)
                                            </Container>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                </Modal>
            </Container>
            <Container style={{alignItems: "center", justifyContent: "right"}}>
                <Button onClick={toggleDislike}
                        style={{fontSize: "1.5rem", color: "black", background: "none", border: "none"}}>
                    {
                        disliked === true ? <AiIcons.AiFillDislike onFormSwitch={toggleDislike}/> :
                            <AiIcons.AiOutlineDislike onFormSwitch={toggleDislike}/>
                    }
                </Button>
            </Container>
        </Navbar>
    );
}

export default CardButtons;