import React from "react";
import { Container, NavDropdown, Navbar, Nav, Button } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";

export const ResponsiveNavbar = () => {
    return (
        <Navbar bg="dark" collapseOnSelect expand="sm" style={{width: "100%"}}>
            <Container style={{ alignItems:"center", justifyContent:"left"}}>
                <Button style={{alignItems: "left"}}><FaIcons.FaBars /></Button>
            </Container>
            <Container style={{ alignItems:"center", justifyContent:"center"}}>
                <Navbar.Brand href="/homepage">WIT ACT</Navbar.Brand>
            </Container>
            <Container style={{ alignItems:"center", justifyContent:"right"}}>
                <Button variant="primary">Create Project</Button>
            </Container>
        </Navbar> 
    )
}

export default ResponsiveNavbar;