import React, { useState, useRef, useEffect } from "react";
import { Container, Navbar, Button, Form, Modal } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg"
import { useNavigate } from "react-router-dom";

export const ResponsiveNavbar = () => {

    const navigate = useNavigate();

    const profilePage = () => {
        navigate('/profile');
    }

    const [projectHidden, setProjectHidden] = useState(true);

    const projectTitleRef = useRef();
    const projectDescRef = useRef();
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

    const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);

    const createProject = () => {
       openModal();
    }

    // useEffect(() => {
    //     projectTitleRef.current.focus();
    //     projectDescRef.current.focus();
    //     projectLeadMakerRef.current.focus();
    //     projectLeadMakerEmailRef.current.focus();
    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    }

    return (
        <>
            <Navbar bg="dark" collapseOnSelect expand="sm" style={{width: "100%"}}>
                <Container style={{ alignItems:"center", justifyContent:"left"}}>
                    <Button style={{ backgroundColor: "slategray", border: "none"}}><FaIcons.FaBars /></Button>
                    
                </Container>
                <Container style={{ alignItems:"center", justifyContent:"center"}}>
                    <Navbar.Brand style={{color: "white"}}>WIT ACT</Navbar.Brand>
                </Container>
                <Container style={{ alignItems:"center", justifyContent:"right"}}>
                    <Button style={{ marginRight: "5px", backgroundColor: "slategray", border: "none"}} onClick={createProject}>+ Create Project</Button>
                    <Button style={{ marginLeft: "5px", fontSize: "1.25rem", background: "none", border: "none"}} onClick={profilePage}><CgIcons.CgProfile /></Button>
                </Container>
            </Navbar> 

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton style={{backgroundColor: "slategrey"}}>
                    <Modal.Title>Post a Project</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "slategrey"}}>
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
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
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
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
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
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
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
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />
                            <Button type="submit" onSubmit={handleSubmit} style={{border: "none", backgroundColor: "white", padding: "20px", borderRadius: "10px", cursor: "pointer", color: "black"}}>Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ResponsiveNavbar;