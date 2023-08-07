import React, {useState, useEffect} from "react";
import {Container, Card, Row, Col, Navbar, Button, Offcanvas, ListGroup, Modal, Form} from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import { Footer } from "../components/Footer";
import { CardButtons } from "../components/CardButtons";
import BookmarkButton from "../components/BookmarkButton";
import { projects } from "./Projects";
import {useNavigate} from "react-router-dom";
import {NAME_REGEX, EMAIL_REGEX, SKILLS, TAGS} from "../Validation/FormValidation";
import axios from "axios";

/*
    This file builds the Homepage UI and functionality.
    The highlights are the grid style layout, the card buttons,
    the buttons functionalities, the populating of the cards with project data,
    and displaying the navbar and footer. The navbar allows the user to create a project,
    the create project form is displayed upon clicking the corresponding button, the user can
    navigate to their profile page, and the side menu.
 */

export const Homepage = () => {

    const [projectList, setProjectList] = useState(projects);

    const navigate = useNavigate();

    const profilePage = () => {
        navigate('/profile');
    };

    const [currProject, setCurrProject] = useState(0);

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
        else if (fullDesc.length < 20 || fullDesc.length > 200) newErrors.fullDesc = 'Full description must be at least 20 characters and less than 200 characters';
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
            try {
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
                if(response.status < 200 || response.status > 299) {
                    console.log(`Error: Response code ${response.status} from server!`);
                } else {
                    console.log("Project added!");
                }
            }
            catch (err){
                console.log(err);
            }
            // TODO visual masking. remove this and replace with actually pulling projects from DB
            const newProject = {
                title: projectTitle,
                shortDesc: projectShortDesc,
                fullDesc: projectDescription,
                generalSkill: generalSkill,
                skillsFocus: skillsFocus,
                specificSkill1: specificSkill1,
                specificSkill2: specificSkill2,
                specificSkill3: specificSkill3,
                tag1: tag1,
                tag2: tag2,
                leadMaker: leadMaker,
                leadMakerEmail: leadMakerEmail,
            };
            const newProjectList = projects;
            newProjectList.push(newProject);
            setProjectList(newProjectList);
            navigate("/homepage"); // TODO when pulling projects from DB, switch to refreshing with navigate(0)
        }
    }

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
        <div className="d-flex flex-column min-vh-100" style={{width: "100%"}}>
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
                    </Modal.Body>
                </Modal>
            </div>

            <Container className="mt-3" style={{ alignItems: "stretch" }}>
                <Row>
                    {projectList.map((project, idx) => {
                        return (
                            <Col>
                                <Card key={idx} id="card" style={{ backgroundColor: "white", minWidth: '18rem', margin: '20px'}}>
                                    <Card.Body>
                                        <Navbar>
                                            <Container style={{ alignItems:"center", justifyContent:"left"}}></Container>
                                            <Container style={{ alignItems:"center", justifyContent:"center"}}>
                                                <Card.Title>{project.title}</Card.Title>
                                            </Container>
                                            <Container style={{ alignItems:"center", justifyContent:"right"}}>
                                                <BookmarkButton />
                                            </Container>
                                        </Navbar>
                                        <Card.Text>{project.shortDesc}</Card.Text>
                                        <Navbar>
                                            <Container style={{alignItems: "center", justifyContent: "left"}}>
                                                <Button onClick={toggleLike}
                                                        style={{fontSize: "1.5rem", color: "black", background: "none", border: "none"}}>
                                                    {
                                                        liked === true ? <AiIcons.AiFillLike onFormSwitch={toggleLike}/> :
                                                            <AiIcons.AiOutlineLike onFormSwitch={toggleLike}/>
                                                    }
                                                </Button>
                                            </Container>
                                            <Container style={{alignItems: "center", justifyContent: "center"}}>
                                                <Button onClick={openExpandedCard}
                                                        style={{backgroundColor: "#000", border: "1px solid #000"}}>Expand</Button>
                                                <Modal show={showExpandedCard} onHide={closeExpandedCard} size="lg"
                                                       aria-labelledby="contained-modal-title-vcenter" centered>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>{project.title}</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Card>
                                                            <Card.Body>
                                                                <Card.Title>Full Description:</Card.Title>
                                                                <Form>
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            as="textarea"
                                                                            style={{
                                                                                margin: "0.5rem 0",
                                                                                padding: "1rem",
                                                                                border: "1px solid black",
                                                                                backgroundColor: "lightgray",
                                                                                borderRadius: "10px",
                                                                                height: "100px"
                                                                            }}
                                                                            defaultValue={project.fullDesc}
                                                                        />
                                                                    </Form.Group>

                                                                    <Card.Title className="mt-2">Desired General Skill:</Card.Title>
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            style={{
                                                                                margin: "0.5rem 0",
                                                                                padding: "1rem",
                                                                                border: "1px solid black",
                                                                                backgroundColor: "lightgray",
                                                                                borderRadius: "10px"
                                                                            }}
                                                                            defaultValue={project.generalSkill}
                                                                        />
                                                                    </Form.Group>

                                                                    <Card.Title className="mt-2">Desired Skill Focus:</Card.Title>
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            style={{
                                                                                margin: "0.5rem 0",
                                                                                padding: "1rem",
                                                                                border: "1px solid black",
                                                                                backgroundColor: "lightgray",
                                                                                borderRadius: "10px"
                                                                            }}
                                                                            defaultValue={project.skillsFocus}
                                                                        />
                                                                    </Form.Group>

                                                                    <Card.Title className="mt-2">Desired Specific Skill:</Card.Title>
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            style={{
                                                                                margin: "0.5rem 0",
                                                                                padding: "1rem",
                                                                                border: "1px solid black",
                                                                                backgroundColor: "lightgray",
                                                                                borderRadius: "10px"
                                                                            }}
                                                                            defaultValue={project.specificSkill1}
                                                                        />
                                                                    </Form.Group>

                                                                    <Card.Title className="mt-2">Desired Specific Skill:</Card.Title>
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            style={{
                                                                                margin: "0.5rem 0",
                                                                                padding: "1rem",
                                                                                border: "1px solid black",
                                                                                backgroundColor: "lightgray",
                                                                                borderRadius: "10px"
                                                                            }}
                                                                            defaultValue={project.specificSkill2}
                                                                        />
                                                                    </Form.Group>

                                                                    <Card.Title className="mt-2">Desired Specific Skill:</Card.Title>
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            style={{
                                                                                margin: "0.5rem 0",
                                                                                padding: "1rem",
                                                                                border: "1px solid black",
                                                                                backgroundColor: "lightgray",
                                                                                borderRadius: "10px"
                                                                            }}
                                                                            defaultValue={project.specificSkill3}
                                                                        />
                                                                    </Form.Group>

                                                                    <Card.Title className="mt-2">Tag:</Card.Title>
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            style={{
                                                                                margin: "0.5rem 0",
                                                                                padding: "1rem",
                                                                                border: "1px solid black",
                                                                                backgroundColor: "lightgray",
                                                                                borderRadius: "10px"
                                                                            }}
                                                                            defaultValue={project.tag1}
                                                                        />
                                                                    </Form.Group>

                                                                    <Card.Title className="mt-2">Tag:</Card.Title>
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            style={{
                                                                                margin: "0.5rem 0",
                                                                                padding: "1rem",
                                                                                border: "1px solid black",
                                                                                backgroundColor: "lightgray",
                                                                                borderRadius: "10px"
                                                                            }}
                                                                            defaultValue={project.tag2}
                                                                        />
                                                                    </Form.Group>

                                                                    <Card.Title className="mt-2">Lead Maker:</Card.Title>
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            style={{
                                                                                margin: "0.5rem 0",
                                                                                padding: "1rem",
                                                                                border: "1px solid black",
                                                                                backgroundColor: "lightgray",
                                                                                borderRadius: "10px"
                                                                            }}
                                                                            defaultValue={project.leadMaker}
                                                                        />
                                                                    </Form.Group>

                                                                    <Card.Title className="mt-2">Lead Maker's Email:</Card.Title>
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            style={{
                                                                                margin: "0.5rem 0",
                                                                                padding: "1rem",
                                                                                border: "1px solid black",
                                                                                backgroundColor: "lightgray",
                                                                                borderRadius: "10px"
                                                                            }}
                                                                            defaultValue={project.leadMakerEmail}
                                                                        />
                                                                    </Form.Group>
                                                                </Form>

                                                                <Card.Title className="mt-2">Other Team Members:</Card.Title>
                                                                <Card.Text>
                                                                    <ListGroup as="ol" numbered>
                                                                        <ListGroup.Item style={{
                                                                            margin: "0.5rem 0",
                                                                            padding: "1rem",
                                                                            border: "1px solid black",
                                                                            backgroundColor: "lightgray",
                                                                            borderRadius: "10px"
                                                                        }} as="li"
                                                                                        className="d-flex justify-content-between align-items-start">
                                                                            <Container className="ms-2 me-auto">
                                                                                <div className="fw-bold">Team Member 1</div>
                                                                                (open spot)
                                                                            </Container>
                                                                        </ListGroup.Item>
                                                                        <ListGroup.Item style={{
                                                                            margin: "0.5rem 0",
                                                                            padding: "1rem",
                                                                            border: "1px solid black",
                                                                            backgroundColor: "lightgray",
                                                                            borderRadius: "10px"
                                                                        }} as="li"
                                                                                        className="d-flex justify-content-between align-items-start">
                                                                            <Container className="ms-2 me-auto">
                                                                                <div className="fw-bold">Team Member 2</div>
                                                                                (open spot)
                                                                            </Container>
                                                                        </ListGroup.Item>
                                                                        <ListGroup.Item style={{
                                                                            margin: "0.5rem 0",
                                                                            padding: "1rem",
                                                                            border: "1px solid black",
                                                                            backgroundColor: "lightgray",
                                                                            borderRadius: "10px"
                                                                        }} as="li"
                                                                                        className="d-flex justify-content-between align-items-start">
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
                                            <Container style={{alignItems: "center", justifyContent: "right"}}>
                                                <Button onClick={toggleDislike}
                                                        style={{fontSize: "1.5rem", color: "black", background: "none", border: "none"}}>
                                                    {
                                                        disliked === true ? <AiIcons.AiFillDislike onFormSwitch={toggleDislike}/> :
                                                            <AiIcons.AiOutlineDislike onFormSwitch={toggleDislike}/>
                                                    }
                                                </Button>
                                            </Container>
                                        </Navbar>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                    }
                </Row>
            </Container>

            <Footer />
        </div>
    )
}

export default Homepage;