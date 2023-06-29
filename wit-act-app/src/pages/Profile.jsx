import React, { useState } from "react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import Footer from "../components/Footer";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Account } from "../components/Account";
import { Skills } from "../components/Skills";
import { ContactInfo } from "../components/ContactInfo";

export const Profile = () => {

    const [accountHidden, setAccountHidden] = useState(true);
    const [skillsHidden, setSkillsHidden] = useState(true);
    const [contactInfo, setContactInfoHidden] = useState(true);

    const showAccountSettingPage = () => {
        setAccountHidden(false);
        setSkillsHidden(true);
        setContactInfoHidden(true);
    }

    const showSkillsSettings = () => {
        setSkillsHidden(false);
        setAccountHidden(true);
        setContactInfoHidden(true);
    }

    const showContactInfoSettings = () => {
        setContactInfoHidden(false);
        setAccountHidden(true);
        setSkillsHidden(true);
    }

    return (
        <Container className="d-flex flex-column min-vh-100 mw-100" style={{padding: "0", margin: "0"}}>
            <ResponsiveNavbar />

            <Container className="mt-3 mb-3" style={{paddingLeft: "0", marginLeft: "1rem", marginRight: "1rem"}}>
                <Row style={{ width: "100%"}}>
                    <Col md={4} style={{padding: "0"}}>
                        <Container style={{ border: "1px solid black", height: "100%", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}}>
                            <section className="">
                                <Button className="mt-3 mb-3"><div style={{textAlign: "left"}} onClick={showAccountSettingPage}>Account</div></Button>
                                <Button className="mt-3 mb-3"><div style={{textAlign: "left"}} onClick={showSkillsSettings}>Skills</div></Button>
                                <Button className="mt-3 mb-3"><div style={{textAlign: "left"}} onClick={showContactInfoSettings}>Contact Info</div></Button>
                            </section>
                        </Container>
                    </Col>
                    <Col md={8} style={{padding: "0"}}>
                        <Container style={{ border: "1px solid black", height: "100%", borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}}>
                            <Container hidden={accountHidden ? true : false}>
                                <Account />
                            </Container>
                            <Container hidden={skillsHidden ? true : false}>
                                <Skills />
                            </Container>
                            <Container hidden={contactInfo ? true : false}>
                                <ContactInfo />
                            </Container>
                        </Container>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </Container>
    )
}

export default Profile;