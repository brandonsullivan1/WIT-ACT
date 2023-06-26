import React, { useState, useRef, useEffect } from "react";
import { Container, Navbar, Button, Form } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg"
import { projects } from "../pages/Projects";
import { useNavigate } from "react-router-dom";

export const ResponsiveNavbar = () => {

    const navigate = useNavigate();

    const profilePage = () => {
        navigate('/profile');
    }

    const [projectHidden, setProjectHidden] = useState(true);

    const [projectList, setProjectList] = useState(projects);

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

    const createProject = () => {
        setProjectHidden(!projectHidden);
    }

    useEffect(() => {
        projectTitleRef.current.focus();
        projectDescRef.current.focus();
        projectLeadMakerRef.current.focus();
        projectLeadMakerEmailRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        projectList = projects.push({
            title: projectTitle,
            description: projectDescription,
            leadMaker: projectLeadMaker,
            leadMakerEmail: projectLeadMakerEmail,
        });
        setProjectList(projectList);
    }

    return (
        <>
            <Navbar bg="dark" collapseOnSelect expand="sm" style={{width: "100%"}}>
                <Container style={{ alignItems:"center", justifyContent:"left"}}>
                    <Button style={{ backgroundColor: "slategray", border: "none"}}><FaIcons.FaBars /></Button>
                </Container>
                <Container style={{ alignItems:"center", justifyContent:"center"}}>
                    <Navbar.Brand href="/homepage">WIT ACT</Navbar.Brand>
                </Container>
                <Container style={{ alignItems:"center", justifyContent:"right"}}>
                    <Button style={{ marginRight: "5px", backgroundColor: "slategray", border: "none"}} onClick={createProject}>+ Create Project</Button>
                    <Button style={{ marginLeft: "5px", fontSize: "1.25rem", background: "none", border: "none"}} onClick={profilePage}><CgIcons.CgProfile /></Button>
                </Container>
            </Navbar> 

            <Form className="auth-form-container" id="project-form" hidden={projectHidden ? true : false} style={{ transform: ""}}>
                <Container>
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
                    <Form.Label htmlFor="">Description:</Form.Label>
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
                </Container>
            </Form>
        </>
    )
}

export default ResponsiveNavbar;