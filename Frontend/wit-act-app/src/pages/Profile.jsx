import React, { useState } from "react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import Footer from "../components/Footer";
import { Container, Card, Col, Row, Button, ListGroup, Form } from "react-bootstrap";
import { Account } from "../components/Account";
import { Skills } from "../components/Skills";
import { ContactInfo } from "../components/ContactInfo";
import * as GrIcons from "react-icons/gr";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import {useNavigate} from "react-router-dom";

export const Profile = () => {
    const navigate = useNavigate();

    const [hideProfilePage, setHideProfilePage] = useState(false);
    const [hideSkillsPage, setHideSkillsPage] = useState(true);
    const [hideContactInfoPage, setHideContactInfoPage] = useState(true);

    const [profilePageActive, setProfilePageActive] = useState(true);
    const [skillsPageActive, setSkillsPageActive] = useState(false);
    const [contactInfoPageActive, setContactInfoPageActive] = useState(false);

    const toggleProfilePage = () => {
        setProfilePageActive(true);
        setHideProfilePage(false);

        setSkillsPageActive(false);
        setHideSkillsPage(true);

        setContactInfoPageActive(false);
        setHideContactInfoPage(true);
    }

    const toggleSkillsPage = () => {
        setSkillsPageActive(true);
        setHideSkillsPage(false);

        setProfilePageActive(false);
        setHideProfilePage(true);

        setContactInfoPageActive(false);
        setHideContactInfoPage(true);
    }

    const toggleContactInfoPage = () => {
        setContactInfoPageActive(true);
        setHideContactInfoPage(false);

        setProfilePageActive(false);
        setHideProfilePage(true);

        setSkillsPageActive(false);
        setHideSkillsPage(true);
    }


    return (
        <Container className="d-flex flex-column min-vh-100 mw-100" style={{padding: "0", margin: "0"}}>
            <ResponsiveNavbar/>

            <Container className="auth-form-container" style={{backgroundColor: "white", height: "1200px"}}>
                <Row>
                    <Col md={4}>
                        <ListGroup as="ul" variant="flush">
                            <ListGroup.Item
                                onClick={toggleProfilePage}
                                active={profilePageActive}
                                style={{cursor: "pointer"}}
                            ><GrIcons.GrUserSettings /> Profile</ListGroup.Item>
                            <ListGroup.Item
                                onClick={toggleSkillsPage}
                                active={skillsPageActive}
                                style={{cursor: "pointer"}}
                            ><GiIcons.GiSkills /> Skills</ListGroup.Item>
                            <ListGroup.Item
                                onClick={toggleContactInfoPage}
                                active={contactInfoPageActive}
                                style={{cursor: "pointer"}}
                            ><RiIcons.RiContactsBookFill /> Contact Information</ListGroup.Item>
                        </ListGroup>
                        <a onClick={() => navigate('/')} style={{color: "black", cursor: "pointer"}}><BiIcons.BiLogOut /> Logout</a>
                    </Col>
                    <Col md={8}>
                        <Container hidden={hideProfilePage}>
                            <Account/>
                        </Container>

                        <Container hidden={hideSkillsPage}>
                            <Skills/>
                        </Container>

                        <Container hidden={hideContactInfoPage}>
                            <ContactInfo/>
                        </Container>
                    </Col>
                </Row>
            </Container>

            <Footer/>
        </Container>
    );
}

export default Profile;