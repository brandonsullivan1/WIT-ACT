import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Button, Col, Container, Form, Row, Tab, Tabs, ProgressBar, InputGroup, Dropdown} from 'react-bootstrap';
import {EMAIL_REGEX, PHONE_NUMBER_REGEX, PWD_REGEX, VALID_MAJORS, VALID_MINORS, NAME_REGEX} from "../Validation/FormValidation";
import { Footer } from "../components/Footer";
import * as Tfi from "react-icons/tfi";
import Profile from "./Profile";
import { Login } from "../components/Login";
import Register from "../components/Register";

const TEST_EMAIL = "sullivanb13@wit.edu";
const TEST_PWD = "TestPassword1!";
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