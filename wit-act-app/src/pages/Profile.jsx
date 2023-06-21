import React from "react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";

export const Profile = () => {
    return (
        <div className="d-flex flex-column min-vh-100" style={{width: "100%"}}>
            <ResponsiveNavbar />

            <Container className="mt-3" style={{ alignItems: "stretch" }}>
                <h1>Profile</h1>
            </Container>

            <Footer />
        </div>
    )
}

export default Profile;