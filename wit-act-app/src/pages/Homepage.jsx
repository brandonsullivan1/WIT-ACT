import React from "react";
import { Container, Card, Row, Col, Navbar } from "react-bootstrap";
import { ResponsiveNavbar } from "../components/ResponsiveNavbar";
import { Footer } from "../components/Footer";
import { projects } from "./Projects";
import { LikeButton } from "../components/LikeButton";
import BookmarkButton from "../components/BookmarkButton";
// import DislikeButton from "../components/DislikeButton";

export const Homepage = () => {
    return (
        <div className="d-flex flex-column min-vh-100" style={{width: "100%"}}>
            <ResponsiveNavbar />

            <Container className="mt-3" style={{ alignItems: "stretch" }}>
                <Row>
                    {projects.map((item) => {
                        return (
                            <Col>
                                <Card style={{ minWidth: '18rem', margin: '20px'}}>
                                    <Card.Body>
                                        <Navbar>
                                            <Container style={{ alignItems:"center", justifyContent:"left"}}></Container>
                                            <Container style={{ alignItems:"center", justifyContent:"center"}}>
                                                <Card.Title>{item.title}</Card.Title>
                                            </Container>
                                            <Container style={{ alignItems:"center", justifyContent:"right"}}>
                                                <BookmarkButton />
                                            </Container>
                                        </Navbar>
                                        <Card.Text>{item.text}</Card.Text>
                                        <LikeButton />
                                        {/* <Navbar>
                                            <Container style={{ alignItems:"center", justifyContent:"left"}}>
                                                <LikeButton />
                                            </Container>
                                            <Container style={{ alignItems:"center", justifyContent:"center"}}>
                                                <Button style={{backgroundColor: "#000", border: "1px solid #000"}}>Expand</Button>
                                            </Container>
                                            <Container style={{ alignItems:"center", justifyContent:"right"}}>
                                                <DislikeButton />
                                            </Container>
                                        </Navbar> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

            <Footer />
        </div>
    )
}

export default Homepage;