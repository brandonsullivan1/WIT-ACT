import React, {useEffect, useRef, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {EMAIL_REGEX, NAME_REGEX, SKILLS, TAGS} from "../Validation/FormValidation";
import axios from "axios";

/*
 TODO update Create_Projects.sql description VARCHAR lengths to match with validateForm()
 */
export const CreateProjectForm = () => {

    const [validated, setValidated] = useState(false);

    const [form, setForm] = useState({
        title: '',
        shortDesc: '',
        fullDesc: '',
        generalSkill: '',
        skillsFocus: '',
        specificSkill1: '',
        specificSkill2: '',
        specificSkill3: '',
        tag1: '',
        tag2: '',
        leadMaker: '',
        leadMakerEmail: '',
    });

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const [errors, setErrors] = useState({});

    const [projectTitle, setProjectTitle] = useState('');

    const [projectShortDesc, setProjectShortDesc] = useState('');

    const [projectDescription, setProjectDescription] = useState('');

    const [generalSkill, setGeneralSkill] = useState('Select general skill...');
    const [skillsFocus, setSkillsFocus] = useState('Select skills focus...');
    const [specificSkill1, setSpecificSkill1] = useState('Select specific skill...');
    const [specificSkill2, setSpecificSkill2] = useState('Select specific skill...');
    const [specificSkill3, setSpecificSkill3] = useState('Select specific skill...');

    const [specSkill2Hidden, setSpecSkill2Hidden] = useState(true);
    const [specSkill3Hidden, setSpecSkill3Hidden] = useState(true);

    const [tag1, setTag1] = useState('(Optional) Select tag...');
    const [tag2, setTag2] = useState('(Optional) Select tag...');

    const [tag2Hidden, setTag2Hidden] = useState(true);

    const [leadMaker, setLeadMaker] = useState('');
    const [validLeadMaker, setValidLeadMaker] = useState(false);

    const [leadMakerEmail, setLeadMakerEmail] = useState('');
    const [validLeadMakerEmail, setValidLeadMakerEmail] = useState(false);

    useEffect(() => {
        if (generalSkill === 'Select general skill...') {
            setSkillsFocus('Select skills focus...');
            setSpecificSkill1('Select specific skill...');
            setSpecSkill2Hidden(true);
            setSpecSkill3Hidden(true);
        }

        if (skillsFocus === 'Select skills focus...') {
            setSpecificSkill1('Select specific skill...');
            setSpecificSkill2('Select specific skill...');
            setSpecificSkill3('Select specific skill...');
            setSpecSkill2Hidden(true);
            setSpecSkill2Hidden(true);
        }

        if (specificSkill2 === 'Select specific skill...') {
            setSpecificSkill3('Select specific skill...');
            setSpecSkill3Hidden(true);
        }

        if (tag1 === '(Optional) Select tag...') {
            setTag2('(Optional) Select tag...');
            setTag2Hidden(true);
        }

        const testLeadMaker = NAME_REGEX.test(leadMaker);
        setValidLeadMaker(testLeadMaker);

        const testLeadMakerEmail = EMAIL_REGEX.test(leadMakerEmail);
        setValidLeadMakerEmail(testLeadMakerEmail);
    }, [generalSkill, skillsFocus, specificSkill1, specificSkill2, tag1, leadMaker, leadMakerEmail])

    const validateForm = () => {
        const {
            title,
            shortDesc,
            fullDesc,
            generalSkill,
            skillsFocus,
            specificSkill1,
            leadMaker,
            leadMakerEmail,
        } = form;

        const newErrors = {};

        if (!title || title === '') newErrors.title = 'Please enter a valid title.';
        if (!shortDesc || shortDesc === '') newErrors.shortDesc = 'Please enter a valid short description.';
        else if (shortDesc.length > 20) newErrors.shortDesc = 'Short description must be 20 characters or less';
        if (!fullDesc || fullDesc === '') newErrors.fullDesc = 'Please enter a valid full description.';
        else if (fullDesc.length < 50 || fullDesc.length > 500) newErrors.fullDesc = 'Full description must be at least 50 characters and less than 500 characters';
        if (!generalSkill || generalSkill === 'Select general skill...') newErrors.generalSkill = 'Please select a general skill.';
        if (!skillsFocus || skillsFocus === 'Select skills focus...') newErrors.skillsFocus = 'Please select a skills focus.';
        if (!specificSkill1 || specificSkill1 === 'Select specific skill...') newErrors.specificSkill1 = 'Please select a specific skill.';
        if (!validLeadMaker || !leadMakerEmail || leadMaker === '') newErrors.leadMaker = 'Please enter a valid name';
        if (!validLeadMakerEmail || !leadMakerEmail || leadMakerEmail === '') newErrors.leadMakerEmail = 'Please enter a valid WIT email';

        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setValidated(true);
            try{
                const response = await axios.post("http://localhost:3100/projects/addproject", {
                    title: projectTitle,
                    shortdesc: projectShortDesc,
                    fulldesc: projectDescription,
                    genskill: generalSkill,
                    skillfocus: skillsFocus,
                    specskill1: specificSkill1,
                    specskill2: specificSkill1,
                    specskill3: specificSkill3,
                    tag1: tag1,
                    tag2: tag2,
                    leadmaker: leadMaker,
                    lmemail: leadMakerEmail
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Mode': 'cors'
                    }
                });
                console.log(response);
                if (!(200 <= response.status && response.status <= 299)) {
                    console.log(`Error: Response code ${response.status} from server!`);
                } else {
                    console.log("Project added!");
                }
            }
            catch(err){
                console.log(err);
            }
        }
    }

    return (
        <Form id="project-form" noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="projectTitle">
                <Form.Label>Project Title:</Form.Label>
                <Form.Control
                    required={true}
                    type="text"
                    id="projectTitle"
                    name="projectTitle"
                    placeholder="Title"
                    onChange={(e) => {
                        setProjectTitle(e.target.value);
                        setField('title', e.target.value);
                    }}
                    value={projectTitle}
                    isInvalid={!!errors.title}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="projectShortDesc">
                <Form.Label htmlFor="project-title">Short Description:</Form.Label>
                <Form.Control
                    required={true}
                    type="text"
                    id="projectShortDesc"
                    name="projectShortDesc"
                    placeholder="Description"
                    onChange={(e) => {
                        setProjectShortDesc(e.target.value);
                        setField('shortDesc', e.target.value);
                    }}
                    value={projectShortDesc}
                    isInvalid={!!errors.shortDesc}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                />
                <Form.Control.Feedback type="invalid">{errors.shortDesc}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="projectFullDesc">
                <Form.Label htmlFor="project-description">Full Description:</Form.Label>
                <Form.Control
                    required={true}
                    type="text"
                    id="projectFullDesc"
                    name="projectFullDesc"
                    placeholder="Description"
                    onChange={(e) => {
                        setProjectDescription(e.target.value);
                        setField('fullDesc', e.target.value);
                    }}
                    value={projectDescription}
                    isInvalid={!!errors.fullDesc}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                />
                <Form.Control.Feedback type="invalid">{errors.fullDesc}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="generalSkill">
                <Form.Label>General Skill:</Form.Label>
                <Form.Select
                    id="generalSkill"
                    name="generalSkill"
                    className={!!errors.generalSkill && 'red-border'}
                    required={true}
                    onChange={(e) => {
                        setGeneralSkill(e.target.value);
                        setField('generalSkill', e.target.value);
                        setSkillsFocus('Select skills focus...');
                    }}
                    value={generalSkill}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                >
                    {Object.keys(SKILLS).map((availableGeneralSkill, idx) => {
                        return (
                            <option key={idx} value={availableGeneralSkill}>{availableGeneralSkill}</option>
                        );
                    })
                    }
                </Form.Select>
                <Container className="red">{errors.generalSkill}</Container>
            </Form.Group>

            <Form.Group controlId="skillsFocus">
                <Form.Label>Skill Focus:</Form.Label>
                <Form.Select
                    id="skillsFocus"
                    name="skillsFocus"
                    className={!!errors.skillsFocus && 'red-border'}
                    required={true}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                    onChange={(e) => {
                        setSkillsFocus(e.target.value);
                        setField('skillsFocus', e.target.value);
                        setSpecificSkill1('Select specific skill...');
                    }}
                    value={skillsFocus}
                >
                    {Object.keys(SKILLS[generalSkill]).map((availableSkillsFocus, idx) => {
                        return (
                            <option key={idx} value={availableSkillsFocus}>{availableSkillsFocus}</option>
                        );
                    })
                    }
                </Form.Select>
                <Container className="red">{errors.skillsFocus}</Container>
            </Form.Group>

            <Form.Group controlId="specificSkill1">
                <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                <Form.Select
                    id="specificSkill1"
                    name="specificSkill1"
                    className={!!errors.specificSkill1 && 'red-border'}
                    required={true}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                    onChange={(e) => {
                        setSpecificSkill1(e.target.value);
                        setField('specificSkill1', e.target.value);
                        setSpecificSkill2('Select specific skill...');
                        setSpecificSkill3('Select specific skill...');
                        setSpecSkill2Hidden(false);
                    }}
                    value={specificSkill1}
                >
                    {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                        return (
                            <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                        );
                    })
                    }
                </Form.Select>
                <Container className="red">{errors.specificSkill1}</Container>
            </Form.Group>

            <Form.Group controlId="specificSkill2" hidden={specSkill2Hidden}>
                <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                <Form.Select
                    id="specificSkill2"
                    name="specificSkill2"
                    onChange={(e) => {
                        setSpecificSkill2(e.target.value);
                        setField('specificSkill2', e.target.value);
                        setSpecificSkill3('Select specific skill...');
                        setSpecSkill3Hidden(false);
                    }}
                    value={specificSkill2}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                >
                    {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                        return (
                            <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                        );
                    })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="specificSkill3" hidden={specSkill3Hidden}>
                <Form.Label style={{color: "black"}}>Specific Skill</Form.Label>
                <Form.Select
                    id="specificSkill3"
                    name="specificSkill3"
                    onChange={(e) => {
                        setSpecificSkill3(e.target.value);
                        setField('specificSkill3', e.target.value);
                    }}
                    value={specificSkill3}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                >
                    {SKILLS[generalSkill][skillsFocus].map((availableSpecificSkill, idx) => {
                        return (
                            <option key={idx} value={availableSpecificSkill}>{availableSpecificSkill}</option>
                        );
                    })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="tag1">
                <Form.Label style={{color: "black"}}>Tag</Form.Label>
                <Form.Select
                    id="tag1"
                    name="tag1"
                    onChange={(e) => {
                        setTag1(e.target.value);
                        setField('tag1', e.target.value);
                        setTag2('(Optional) Select tag...');
                        setTag2Hidden(false);
                    }}
                    value={tag1}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                >
                    {TAGS.map((availableTag, idx) => {
                        return (
                            <option key={idx} value={availableTag}>{availableTag}</option>
                        );
                    })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="tag2" hidden={tag2Hidden}>
                <Form.Label style={{color: "black"}}>Tag</Form.Label>
                <Form.Select
                    id="tag2"
                    name="tag2"
                    onChange={(e) => {
                        setTag2(e.target.value);
                        setField('tag2', e.target.value);
                    }}
                    value={tag2}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                >
                    {TAGS.map((availableTag, idx) => {
                        return (
                            <option key={idx} value={availableTag}>{availableTag}</option>
                        );
                    })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="leadMaker">
                <Form.Label>Lead Maker:</Form.Label>
                <Form.Control
                    type="text"
                    id="leadMaker"
                    name="leadMaker"
                    placeholder="Full name"
                    required={true}
                    onChange={(e) => {
                        setLeadMaker(e.target.value);
                        setField('leadMaker', e.target.value);
                    }}
                    value={leadMaker}
                    isInvalid={!!errors.leadMaker}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                />
                <Form.Control.Feedback type="invalid">{errors.leadMaker}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="leadMakerEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="text"
                    id="leadMakerEmail"
                    name="leadMakerEmail"
                    placeholder="leadmaker@wit.edu"
                    required={true}
                    onChange={(e) => {
                        setLeadMakerEmail(e.target.value);
                        setField('leadMakerEmail', e.target.value);
                    }}
                    value={leadMakerEmail}
                    isInvalid={!!errors.leadMakerEmail}
                    style={{
                        margin: "0.5rem 0",
                        padding: "1rem",
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                        borderRadius: "10px"
                    }}
                />
                <Form.Control.Feedback type="invalid">{errors.leadMakerEmail}</Form.Control.Feedback>
            </Form.Group>


            <Button type="submit" style={{
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