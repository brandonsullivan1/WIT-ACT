import React from "react";
import { Container, Row, Col } from "react-bootstrap";

/*
    This file displays the footer and is exported to each page of the web app.
 */

export const Footer = () => {
    return (
        <div className="bg-dark mt-auto">
            <Container className="p-3">
                {/* <p className="text-center text-white">WIT ACT</p> */}
                <Row>
                    <Col className="text-center">
                        <p className="text-center">Connect</p>
                    </Col>
                    <Col className="text-center">
                        <p>Grow</p>
                    </Col>
                    <Col className="text-center">
                        <p>Create</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer;