import React, { useState, useRef, useEffect } from "react";
import {Container, Navbar, Button, Form, Modal, Offcanvas, ListGroup} from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
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

    const [homepageFilterActive, setHomepageFilterActive] = useState(false);
    const [projectFilterActive, setProjectFilterActive] = useState(false);
    const [makerFilterActive, setMakerFilterActive] = useState(false);

    const toggleHomepageFilterActive = () => {
        setHomepageFilterActive(true);
        setProjectFilterActive(false);
        setMakerFilterActive(false);

        navigate('/homepage');
    }
    const toggleProjectFilterActive = () => {
        setHomepageFilterActive(false);
        setProjectFilterActive(true);
        setMakerFilterActive(false);
    }

    const toggleMakerFilterActive = () => {
        setHomepageFilterActive(false);
        setProjectFilterActive(false);
        setMakerFilterActive(true);
    }

    return (
        <div>
            <Navbar bg="dark" collapseOnSelect expand="sm" style={{width: "100%"}}>
                <Container style={{alignItems: "center", justifyContent: "left"}}>
                    <Button onClick={openSidebar}
                            style={{backgroundColor: "slategray", border: "none"}}><FaIcons.FaBars/></Button>
                    <Offcanvas show={showSidebar} onHide={closeSidebar} style={{maxWidth: "300px"}}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title style={{fontSize: "30px", justifyContent: "center"}}>Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ListGroup as="ul" variant="flush">
                                <ListGroup.Item as="li" onClick={toggleHomepageFilterActive}
                                                active={homepageFilterActive} style={{cursor: "pointer"}}>
                                    <IoIcons.IoIosHome style={{fontSize: "25px"}}/> Homepage
                                </ListGroup.Item>
                                {/*<ListGroup.Item as="li" onClick={toggleProjectFilterActive} active={projectFilterActive}*/}
                                {/*                style={{cursor: "pointer"}}>*/}
                                {/*    <AiIcons.AiFillProject style={{fontSize: "25px"}}/> Projects*/}
                                {/*</ListGroup.Item>*/}
                                {/*<ListGroup.Item as="li" onClick={toggleMakerFilterActive} active={makerFilterActive}*/}
                                {/*                style={{cursor: "pointer"}}>*/}
                                {/*    <RiIcons.RiTeamFill style={{fontSize: "25px"}}/> Makers*/}
                                {/*</ListGroup.Item>*/}
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