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
                        <Modal.Title>Stock Price Predictor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card>
                            <Card.Body>
                                <Card.Title>Description:</Card.Title>
                                <Card.Text>The goal of this project is to build a database of historical stock prices and
                                    predict the future prices. Each stock should have a sufficient amount of historical
                                    data for accurate predictions. The prediction model needs tobe researched.
                                </Card.Text>
                                <Card.Title>Desired General Skill:</Card.Title>
                                <Card.Text>Computing and Data Science</Card.Text>
                                <Card.Title>Desired Skill Focus:</Card.Title>
                                <Card.Text>Software Engineering</Card.Text>
                                <Card.Title>Lead Maker:</Card.Title>
                                <Card.Text>Brandon Sullivan</Card.Text>
                                <Card.Title>Lead Maker Email:</Card.Title>
                                <Card.Text>sullivanb13@wit.edu</Card.Text>
                                <Card.Title>Other Team Members:</Card.Title>
                                <Card.Text>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Josh Polischuk</div>
                                                    polischukj@wit.edu
                                            </Container>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                            <Container className="ms-2 me-auto">
                                                <div className="fw-bold">Team Member 2</div>
                                                (open spot)
                                            </Container>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
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