import React, {useState} from "react";
import {Container, Tab, Tabs} from 'react-bootstrap';
import { Footer } from "../components/Footer";
import { Login } from "../components/Login";
import Register from "../components/Register";

/*
    This page is designed to be the first page a user sees when navigating to the site.
    From this page the user can either login to their account or register for an account.

    The page consists of 2 components Login and Register.

    Each component is imported from a file containing the UI design and forms a user must fill out
    corresponding to each component.
 */

export const LandingPage = () => {
    const [activeKey, setActiveKey] = useState("login");
    const [loginDisabled, setLoginDisabled] = useState(false);
    const [registerDisabled, setRegisterDisabled] = useState(true);

    const changeTab = (e) => {
        e.preventDefault();
        if (activeKey === "login") {
            setActiveKey("register");
            setRegisterDisabled(false);
            setLoginDisabled(true);
        }

        if (activeKey === "register") {
            setActiveKey("login");
            setRegisterDisabled(true);
            setLoginDisabled(false);
        }
    }

    return (
        <Container>
            <Container style={{
                border: "1px solid white",
                padding: "0",
                borderTopLeftRadius: "7px",
                borderTopRightRadius: "7px",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Tabs activeKey={activeKey} fill justify style={{width: "100%", backgroundColor: "lightgray", color: "white", borderTopLeftRadius: "7px", borderTopRightRadius: "7px"}}>
                    <Tab eventKey="login" title="Login" disabled={loginDisabled}>
                        <Container style={{backgroundColor: "white"}}>
                            <Login />
                            <p style={{color: "black", margin: "0"}}>Don't have an account? <a href='' onClick={changeTab} style={{color: "black"}}>Register here.</a></p>
                        </Container>
                    </Tab>

                    <Tab eventKey="register" title="Register" disabled={registerDisabled}>
                        <Container style={{backgroundColor: "white"}}>
                            <Register />
                            <p style={{color: "black", margin: "0"}}>Already have an account? <a href='' onClick={changeTab} style={{color: "black"}}>Login here.</a></p>
                        </Container>
                    </Tab>
                </Tabs>
            </Container>

            <Footer/>
        </Container>
    );
}

export default LandingPage;