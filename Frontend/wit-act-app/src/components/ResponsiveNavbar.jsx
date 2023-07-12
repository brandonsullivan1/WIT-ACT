import React, { useState, useRef, useEffect } from "react";
import {Container, Navbar, Button, Form, Modal, Offcanvas, ListGroup} from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg"
import { useNavigate } from "react-router-dom";

export const ResponsiveNavbar = () => {

    const navigate = useNavigate();

    const profilePage = () => {
        navigate('/profile');
    }

    const projectTitleRef = useRef();
    const projectDescRef = useRef();
    const projectSkillsRef = useRef();
    const projectLeadMakerRef = useRef();
    const projectLeadMakerEmailRef = useRef();

    const [projectTitle, setProjectTitle] = useState('');
    const [projectTitleFocus, setProjectTitleFocus] = useState(false);

    const [projectDescription, setProjectDescription] = useState('');
    const [projectDescFocus, setProjectDescFocus] = useState(false);

    const [projectLeadMaker, setProjectLeadMaker] = useState('');
    const [projectLeadMakerFocus, setProjectLeadMakerFocus] = useState(false);

    const [projectLeadMakerEmail, setProjectLeadMakerEmail] = useState('');
    const [projectLeadMakerEmailFocus, setProjectLeadMakerEmailFocus] = useState(false);

    const [skills, setSkills] = useState([]);

    const [skill1, setSkill1] = useState('');
    const [skill2, setSkill2] = useState('');
    const [skill3, setSkill3] = useState('');
    const [skill4, setSkill4] = useState('');
    const [skill5, setSkill5] = useState('');

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


    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Navbar bg="dark" collapseOnSelect expand="sm" style={{width: "100%"}}>
                <Container style={{ alignItems:"center", justifyContent:"left"}}>
                    <Button onClick={openSidebar} style={{ backgroundColor: "slategray", border: "none"}}><FaIcons.FaBars /></Button>
                    <Offcanvas show={showSidebar} onHide={closeSidebar}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Filters</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ListGroup as="ul">
                                <ListGroup.Item as="li" onClick={toggleProjectFilterActive} active={projectFilterActive}>
                                    Projects
                                </ListGroup.Item>
                                <ListGroup.Item as="li" onClick={toggleMakerFilterActive} active={makerFilterActive}>
                                    Makers
                                </ListGroup.Item>
                            </ListGroup>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Container>
                <Container style={{ alignItems:"center", justifyContent:"center"}}>
                    <Navbar.Brand style={{color: "white"}}>WIT ACT</Navbar.Brand>
                </Container>
                <Container style={{ alignItems:"center", justifyContent:"right"}}>
                    <Button style={{ marginRight: "5px", backgroundColor: "slategray", border: "none"}} onClick={openModal}>+ Create Project</Button>
                    <Button style={{ marginLeft: "5px", fontSize: "1.25rem", background: "none", border: "none"}} onClick={profilePage}><CgIcons.CgProfile /></Button>
                </Container>
            </Navbar> 

            <Modal show={showModal} onHide={closeModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{backgroundColor: "white"}}>
                    <Modal.Title id="contained-modal-title-vcenter">Post a Project</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "white"}}>
                    <Form id="project-form">
                            <Form.Label htmlFor="project-title">Project Title:</Form.Label>
                            <Form.Control
                                type="title"
                                id="project-title"
                                name="project-title"
                                placeholder="Title"
                                ref={projectTitleRef}
                                autoComplete="off"
                                onChange={(e) => setProjectTitle(e.target.value)}
                                value={projectTitle}
                                required
                                onFocus={() => setProjectTitleFocus(true)}
                                onBlur = {() => setProjectTitleFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "1px solid black", backgroundColor: "lightgray", borderRadius: "10px" }}
                            />

                            <Form.Label htmlFor="project-description">Description:</Form.Label>
                            <Form.Control
                                type="text"
                                id="project-description"
                                name="project-descrition"
                                placeholder="Description"
                                ref={projectDescRef}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                value={projectDescription}
                                required
                                onFocus={() => setProjectDescFocus(true)}
                                onBlur={() => setProjectDescFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "1px solid black", backgroundColor: "lightgray", borderRadius: "10px" }}
                            />

                            <Form.Label htmlFor="skills">Skills:</Form.Label>
                            <Form.Control
                                type="text"
                                id="skills"
                                name="skill-1"
                                placeholder="Skill 1"
                                ref={projectSkillsRef}
                                onChange={(e) => setSkill1(e.target.value)}
                                value={skill1}
                                required
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "1px solid black", backgroundColor: "lightgray", borderRadius: "10px" }}
                            />
                            <Form.Control
                                type="text"
                                id="skills"
                                name="skill-2"
                                placeholder="Skill 2"
                                ref={projectSkillsRef}
                                onChange={(e) => setSkill2(e.target.value)}
                                value={skill2}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "1px solid black", backgroundColor: "lightgray", borderRadius: "10px" }}
                            />
                            <Form.Control
                                type="text"
                                id="skills"
                                name="skill-3"
                                placeholder="Skill 3"
                                ref={projectSkillsRef}
                                onChange={(e) => setSkill3(e.target.value)}
                                value={skill3}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "1px solid black", backgroundColor: "lightgray", borderRadius: "10px" }}
                            />
                            <Form.Control
                                type="text"
                                id="skills"
                                name="skill-4"
                                placeholder="Skill 4"
                                ref={projectSkillsRef}
                                onChange={(e) => setSkill4(e.target.value)}
                                value={skill4}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "1px solid black", backgroundColor: "lightgray", borderRadius: "10px" }}
                            />
                            <Form.Control
                                type="text"
                                id="skills"
                                name="skill-5"
                                placeholder="Skill 5"
                                ref={projectSkillsRef}
                                onChange={(e) => setSkill5(e.target.value)}
                                value={skill5}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "1px solid black", backgroundColor: "lightgray", borderRadius: "10px" }}
                            />

                            <Form.Label htmlFor="project-leadmaker">Project Lead Maker:</Form.Label>
                            <Form.Control
                                type="name"
                                id="project-leadmaker"
                                name="project-leadmaker"
                                placeholder="Full Name"
                                ref={projectLeadMakerRef}
                                onChange={(e) => setProjectLeadMaker(e.target.value)}
                                value={projectLeadMaker}
                                required
                                onFocus={() => setProjectLeadMakerFocus(true)}
                                onBlur={() => setProjectLeadMakerFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "1px solid black", backgroundColor: "lightgray", borderRadius: "10px" }}
                            />

                            <Form.Label htmlFor="project-leadmaker-email">Email:</Form.Label>
                            <Form.Control
                                type="email"
                                id="project-leadmaker-email"
                                name="project-leadmaker-email"
                                placeholder="student@wit.edu"
                                ref={projectLeadMakerEmailRef}
                                onChange={(e) => setProjectLeadMakerEmail(e.target.value)}
                                value={projectLeadMakerEmail}
                                required
                                onFocus={() => setProjectLeadMakerEmailFocus(true)}
                                onBlur={() => setProjectLeadMakerEmailFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "1px solid black", backgroundColor: "lightgray", borderRadius: "10px" }}
                            />
                            <Button type="submit" onSubmit={handleSubmit} style={{border: "none", backgroundColor: "black", padding: "20px", borderRadius: "10px", cursor: "pointer", color: "white"}}>Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ResponsiveNavbar;