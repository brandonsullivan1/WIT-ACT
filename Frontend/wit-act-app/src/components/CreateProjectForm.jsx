import React, {useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";

export const CreateProjectForm = () => {

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // add POST method to send project to database
    }

    return (
        <Form id="project-form">
            <Form.Group>
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
                    onBlur={() => setProjectTitleFocus(false)}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="project-title">Short Description:</Form.Label>
                <Form.Control
                    type="title"
                    id="project-title"
                    name="project-title"
                    placeholder="Description"
                    ref={projectTitleRef}
                    autoComplete="off"
                    onChange={(e) => setProjectTitle(e.target.value)}
                    value={projectTitle}
                    required
                    onFocus={() => setProjectTitleFocus(true)}
                    onBlur={() => setProjectTitleFocus(false)}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="project-description">Full Description:</Form.Label>
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
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>General Skill:</Form.Label>
                <Form.Select
                    required
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                >
                    <option>Select topic...</option>
                    <option>Computing and Data Science</option>
                    <option>Sciences & Humanities</option>
                    <option>Architecture & Design</option>
                    <option>Engineering</option>
                    <option>Management</option>
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label>Skill Focus:</Form.Label>
                <Form.Select
                    required
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                >
                    <option>Select focus...</option>
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label>Lead Maker:</Form.Label>
                <Form.Control
                    required
                    type="text"
                    id="lead-maker"
                    name="lead-maker"
                    placeholder="Full name"
                    ref={projectLeadMakerRef}
                    onChange={(e) => setProjectLeadMaker(e.target.value)}
                    value={projectLeadMaker}
                    onFocus={() => setProjectLeadMakerFocus(true)}
                    onBlur={() => setProjectLeadMakerFocus(false)}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    required
                    type="text"
                    id="lead-maker-email"
                    name="lead-maker-email"
                    placeholder="leadmaker@wit.edu"
                    ref={projectLeadMakerEmailRef}
                    onChange={(e) => setProjectLeadMakerEmail(e.target.value)}
                    value={projectLeadMaker}
                    onFocus={() => setProjectLeadMakerEmailFocus(true)}
                    onBlur={() => setProjectLeadMakerEmailFocus(false)}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                />
            </Form.Group>


            <Button type="submit" onSubmit={handleSubmit} style={{
                border: "none",
                backgroundColor: "black",
                padding: "20px",
                borderRadius: "10px",
                cursor: "pointer",
                color: "white"
            }}>Submit</Button>
        </Form>
    );
}

export default CreateProjectForm;