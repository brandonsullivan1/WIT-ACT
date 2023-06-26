import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Navbar } from "react-bootstrap";
import { ResponsiveNavbar } from "../components/ResponsiveNavbar";
import { Footer } from "../components/Footer";
import { CardButtons } from "../components/CardButtons";
import BookmarkButton from "../components/BookmarkButton";

export const Homepage = () => {

    const [projects, setProjects] = useState([{}])

    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(
            backendData => {
                setProjects(backendData)
            }
        )
    }, [])

    return (
        <div className="d-flex flex-column min-vh-100" style={{width: "100%"}}>
            <ResponsiveNavbar />

            <Container className="mt-3" style={{ alignItems: "stretch" }}>
                <Row>
                    {projects.projects?.map((item, i) => {
                            return (
                                <Col>
                                    <Card id="card" style={{ backgroundColor: "white", minWidth: '18rem', margin: '20px'}}>
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
                                            <Card.Text>{item.description}</Card.Text>
                                            <CardButtons />
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