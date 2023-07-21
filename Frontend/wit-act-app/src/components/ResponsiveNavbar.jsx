import React, { useState, useRef, useEffect } from "react";
import {Container, Navbar, Button, Form, Modal, Offcanvas, ListGroup} from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg"
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "./CreateProjectForm";

export const ResponsiveNavbar = () => {

    const navigate = useNavigate();

    const profilePage = () => {
        navigate('/profile');
    };

    const [showModal, setShowModal] = useState(false);

    const [showSidebar, setShowSidebar] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const openSidebar = () => setShowSidebar(true);
    const closeSidebar = () => setShowSidebar(false);

    const [projectFilterActive, setProjectFilterActive] = useState(false);
    const [makerFilterActive, setMakerFilterActive] = useState(false);

    const toggleProjectFilterActive = () => {
        setProjectFilterActive(true);
        setMakerFilterActive(false);
    }

    const toggleMakerFilterActive = () => {
        setProjectFilterActive(false);
        setMakerFilterActive(true);
    }

    return (
        <div>
            <Navbar bg="dark" collapseOnSelect expand="sm" style={{width: "100%"}}>
                <Container style={{alignItems: "center", justifyContent: "left"}}>
                    <Button onClick={openSidebar}
                            style={{backgroundColor: "slategray", border: "none"}}><FaIcons.FaBars/></Button>
                    <Offcanvas show={showSidebar} onHide={closeSidebar}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ListGroup as="ul">
                                <ListGroup.Item as="li" onClick={toggleProjectFilterActive}
                                                active={projectFilterActive}>
                                    Projects
                                </ListGroup.Item>
                                <ListGroup.Item as="li" onClick={toggleMakerFilterActive} active={makerFilterActive}>
                                    Makers
                                </ListGroup.Item>
                            </ListGroup>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Container>
                <Container style={{alignItems: "center", justifyContent: "center"}}>
                    <Navbar.Brand style={{color: "white"}}>WIT ACT</Navbar.Brand>
                </Container>
                <Container style={{alignItems: "center", justifyContent: "right"}}>
                    <Button style={{marginRight: "5px", backgroundColor: "slategray", border: "none"}}
                            onClick={openModal}>+ Create Project</Button>
                    <Button style={{marginLeft: "5px", fontSize: "1.25rem", background: "none", border: "none"}}
                            onClick={profilePage}><CgIcons.CgProfile/></Button>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={closeModal} size="lg" aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton style={{backgroundColor: "white"}}>
                    <Modal.Title id="contained-modal-title-vcenter">Post a Project</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "white"}}>
                    <CreateProjectForm/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ResponsiveNavbar;