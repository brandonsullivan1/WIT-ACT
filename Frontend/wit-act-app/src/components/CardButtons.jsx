import React, { useState } from "react";
import {Button, Navbar, Container, Modal, Card, ListGroup} from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import { projects } from "../pages/Projects";

export const CardButtons = () => {

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
            <Container style={{ alignItems:"center", justifyContent:"left" }}>
            <Button onClick={toggleLike} style={{ fontSize: "1.5rem", color: "black", background: "none", border: "none"}}>
                    {
                        liked === true ?  <AiIcons.AiFillLike onFormSwitch={toggleLike} /> : <AiIcons.AiOutlineLike onFormSwitch={toggleLike} />
                    }
            </Button>
            </Container>
            <Container style={{ alignItems:"center", justifyContent:"center"}}>
                <Button onClick={openExpandedCard} style={{backgroundColor: "#000", border: "1px solid #000"}}>Expand</Button>
                <Modal show={showExpandedCard} onHide={closeExpandedCard} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Project Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card>
                            <Card.Body>
                                <Card.Title>Description:</Card.Title>
                                <Card.Text>This is an example of a project description.</Card.Text>
                                <Card.Title>Desired Skills:</Card.Title>
                                <Card.Text>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Skill 2</div>
                                                Description of Skill 2.
                                            </Container>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Skill 3</div>
                                                Description of Skill 3.
                                            </Container>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Skill 4</div>
                                                Description of Skill 4.
                                            </Container>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Skill 4</div>
                                                Description of Skill 4.
                                            </Container>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Skill 5</div>
                                                Description of Skill 5.
                                            </Container>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Text>
                                <Card.Title>Lead Maker:</Card.Title>
                                <Card.Text>Lead Maker</Card.Text>
                                <Card.Title>Lead Maker Email:</Card.Title>
                                <Card.Text>leadmaker@wit.edu</Card.Text>
                                <Card.Title>Other Team Members:</Card.Title>
                                <Card.Text>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Team Member 1</div>
                                                    team member1@wit.edu
                                            </Container>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Team Member 2</div>
                                                teammember2@wit.edu
                                            </Container>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Team Member 3</div>
                                                teammember3@wit.edu
                                            </Container>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                </Modal>
            </Container>
            <Container style={{ alignItems:"center", justifyContent:"right"}}>
                <Button onClick={toggleDislike} style={{ fontSize: "1.5rem", color: "black", background: "none", border: "none"}}>
                    {
                        disliked === true ? <AiIcons.AiFillDislike onFormSwitch={toggleDislike} /> : <AiIcons.AiOutlineDislike onFormSwitch={toggleDislike} />
                    }
                </Button>
            </Container>
        </Navbar>
    )   
}

export default CardButtons;