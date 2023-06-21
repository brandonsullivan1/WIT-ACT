import React from "react";
import { Container, NavDropdown, Navbar, Nav, Button } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";

export const ResponsiveNavbar = () => {
    return (
        <Navbar bg="dark" collapseOnSelect expand="sm" style={{width: "100%"}}>
            <Container style={{ alignItems:"center", justifyContent:"left"}}>
                <Button style={{ backgroundColor: "slategray", border: "none"}}><FaIcons.FaBars /></Button>
            </Container>
            <Container style={{ alignItems:"center", justifyContent:"center"}}>
                <Navbar.Brand href="/homepage">WIT ACT</Navbar.Brand>
            </Container>
            <Container style={{ alignItems:"center", justifyContent:"right"}}>
                <Button style={{ backgroundColor: "slategray", border: "none"}}>+ Create Project</Button>
            </Container>
        </Navbar> 
    )
}

export default ResponsiveNavbar;