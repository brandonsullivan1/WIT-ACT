import React, {useEffect, useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {SKILLS, TAGS} from "../Validation/FormValidation";
import axios from "axios";

export const CreateProjectForm = () => {

    const projectTitleRef = useRef();
    const projectDescRef = useRef();
    const projectSkillsRef = useRef();
    const projectLeadMakerRef = useRef();
    const projectLeadMakerEmailRef = useRef();

    const [projectTitle, setProjectTitle] = useState('');
    const [projectTitleFocus, setProjectTitleFocus] = useState(false);

    const [projectShortDesc, setProjectShortDesc] = useState('');

    const [projectDescription, setProjectDescription] = useState('');
    const [projectDescFocus, setProjectDescFocus] = useState(false);

    const [generalSkill, setGeneralSkill] = useState('Select general skill...');
    const [skillsFocus, setSkillsFocus] = useState('Select skill focus...');
    const [specSkill1, setSpecSkill1] = useState('Select specific skill...');
    const [specSkill2, setSpecSkill2] = useState('Select specific skill...');
    const [specSkill3, setSpecSkill3] = useState('Select specific skill...');

    const [specSkill2Hidden, setSpecSkill2Hidden] = useState(true);
    const [specSkill3Hidden, setSpecSkill3Hidden] = useState(true);

    const [tag1, setTag1] = useState('(Optional) Select tag...');
    const [tag2, setTag2] = useState('(Optional) Select tag...');

    const [tag2Hidden, setTag2Hidden] = useState(true);

    const [projectLeadMaker, setProjectLeadMaker] = useState('');
    const [projectLeadMakerFocus, setProjectLeadMakerFocus] = useState(false);

    const [projectLeadMakerEmail, setProjectLeadMakerEmail] = useState('');
    const [projectLeadMakerEmailFocus, setProjectLeadMakerEmailFocus] = useState(false);

    const changeGeneralSkill = (e) => {
        setGeneralSkill(e.target.value);
        setSkillsFocus('Select skill focus...');
    }

    const changeSpecSkill1 = (e) => {
        setSpecSkill1(e.target.value);
        setSpecSkill2Hidden(false);
    }

    const changeSpecSkill2 = (e) => {
        setSpecSkill2(e.target.value);
        setSpecSkill3Hidden(false);
    }

    const changeSpecSkill3 = (e) => {
        setSpecSkill3(e.target.value);
    }

    const changeTag1 = (e) => {
        setTag1(e.target.value);
        setTag2Hidden(false);
    }

    const changeTag2 = (e) => {
        setTag2(e.target.value);
    }

    useEffect(() => {
        if (specSkill1 === "Select specific skill...") {
            setSpecSkill2Hidden(true);
            setSpecSkill3Hidden(true);
        }
    }, [specSkill1])

    useEffect(() => {
        if (specSkill2 === "Select specific skill...") {
            setSpecSkill3Hidden(true);
        }
    }, [specSkill2])

    useEffect(() => {
        if (tag1 === "(Optional) Select tag...") {
            setTag2Hidden(true);
        }
    }, [tag1])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3100/users/fetchuser", {
            title: projectTitle,
            shortdesc: projectShortDesc,
            fulldesc: projectDescription,
            genskill: generalSkill,
            skillfocus: skillsFocus,
            specskill1: specSkill1,
            specskill2: specSkill2,
            speckskill3: specSkill3,
            tag1: tag1,
            tag2: tag2,
            leadmaker: projectLeadMaker,
            lmemail: projectLeadMakerEmail
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Mode': 'cors'
            }
        })
            .then((response) => {
                console.log(response);
                if(!(200 <= response.status && response.status <= 299)){
                    console.log(`Error: Response code ${response.status} from server!`);
                } else {
                    console.log("Project added!");
                }
            })
            .catch((err) => {
                console.error(err);
            });
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

            <Form.Group controlId="generalSkillValidation">
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
                    onChange={changeGeneralSkill}
                    value={generalSkill}
                >
                    {Object.keys(SKILLS).map((availableGenSkill, idx) => {
                        return (
                            <option key={idx}>{availableGenSkill}</option>
                        );
                    })
                    }
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
                    onChange={(e) => setSkillsFocus(e.target.value)}
                    value={skillsFocus}
                >
                    {Object.keys(SKILLS[generalSkill]).map((availableFocus, idx) => {
                        return (
                            <option key={idx}>{availableFocus}</option>
                        );
                    })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="specSkill1Validation">
                <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                <Form.Select
                    required
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                    onChange={changeSpecSkill1}
                    value={specSkill1}
                >
                    {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                        return (
                            <option key={idx}>{availableSpecificSkill}</option>
                        );
                    })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="specSkill2Validation" hidden={specSkill2Hidden}>
                <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                <Form.Select
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                    onChange={changeSpecSkill2}
                    value={specSkill2}
                >
                    {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                        return (
                            <option key={idx}>{availableSpecificSkill}</option>
                        );
                    })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="specSkill3Validaiton" hidden={specSkill3Hidden}>
                <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                <Form.Select
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                    onChange={changeSpecSkill3}
                    value={specSkill3}
                >
                    {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                        return (
                            <option key={idx}>{availableSpecificSkill}</option>
                        );
                    })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="tag1Validation">
                <Form.Label style={{color: "black"}}>Tag</Form.Label>
                <Form.Select
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                    onChange={changeTag1}
                    value={tag1}
                >
                    {TAGS.map((availableTag, idx) => {
                        return (
                            <option key={idx}>{availableTag}</option>
                        );
                    })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="tag2Validation" hidden={tag2Hidden}>
                <Form.Label style={{color: "black"}}>Tag</Form.Label>
                <Form.Select
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                    onChange={changeTag2}
                    value={tag2}
                >
                    {TAGS.map((availableTag, idx) => {
                        return (
                            <option key={idx}>{availableTag}</option>
                        );
                    })
                    }
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