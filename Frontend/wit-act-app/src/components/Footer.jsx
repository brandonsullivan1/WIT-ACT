import React from "react";
import { Container, Row, Col } from "react-bootstrap";

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