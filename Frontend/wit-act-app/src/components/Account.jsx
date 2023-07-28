import React, { useState } from "react";
import {Container, Form, Button, Card} from "react-bootstrap";
import {VALID_MAJORS, VALID_MINORS, TAGS} from "../Validation/FormValidation";

export const Account = () => {

    const [success, setSuccess] = useState('');

    const [pwdFormHidden, setPwdFormHidden] = useState(true);
    const [minorFormHidden, setMinorFormHidden] = useState(true);
    const [tageFormHidden, setTagFormHidden] = useState(true);

    const [minorSelectHidden, setMinorSelectHidden] = useState(true);
    const [tagSelectHidden, setTagSelectHidden] = useState(true);

    const [currPwd, setCurrPwd] = useState('');
    const [matchCurrPwd, setMatchCurrPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [newPwd, setNewPwd] = useState('');
    const [validNewPwd, setValidNewPwd] = useState(false);
    const [newPwdFocus, setNewPwdFocus] = useState(false);

    const [matchNewPwd, setMatchNewPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const pwdForm = () => {
        const btn = document.getElementById('pwdBtn');

        if (pwdFormHidden) {
            setPwdFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white"
        } else {
            setPwdFormHidden(true);
            btn.style.color = "white";
            btn.style.backgroundColor = "black"
        }
    }

    const updatePassword = () => {
        // add update password in DB
        // need to pull current password
    }

    const updateMinor = () => {
        // add update password in DB
        // change or add minor
    }

    const updateTag = () => {
        // add update password in DB
        // change or add tag
    }

    const minorForm = () => {
        const btn = document.getElementById('minorBtn');

        if (minorFormHidden) {
            setMinorFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white"
        } else {
            setMinorFormHidden(true);
            btn.style.color = "white";
            btn.style.backgroundColor = "black"
        }
    }

    const tagForm = () => {
        const btn = document.getElementById('tagBtn');

        if (tageFormHidden) {
            setTagFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white"
        } else {
            setTagFormHidden(true);
            btn.style.color = "white";
            btn.style.backgroundColor = "black"
        }
    }

    return (
        <Container>
            <Card>
                <Card.Title className="mt-3">Profile</Card.Title>
                <Card style={{
                    borderBottom: "none",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTopRightRadius: "0",
                    borderTopLeftRadius: "0"
                }}>
                    <Card.Title className="mt-3">Password</Card.Title>
                    <Card.Body>
                        <Button style={{
                            border: "2px solid black",
                            backgroundColor: "black",
                            padding: "1rem 1rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "white",
                            width: "60%",
                        }} onClick={pwdForm} id="pwdBtn">Update Password</Button>

                        <Form hidden={pwdFormHidden} className="mt-3">
                            <Form.Group>
                                <Form.Label>Current Password:</Form.Label>
                                <Form.Control
                                    required
                                    id="current-pwd"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setCurrPwd(e.target.value)}
                                    value={currPwd}
                                    aria-invalid={matchCurrPwd ? "false" : "true"}
                                    aria-describedby="current-pwd-note"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>New Password:</Form.Label>
                                <Form.Control
                                    required
                                    id="new-pwd"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setNewPwd(e.target.value)}
                                    value={newPwd}
                                    aria-invalid={validNewPwd ? "false" : "true"}
                                    aria-describedby='new-pwd-note'
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control
                                    required
                                    id="current-pwd"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setMatchNewPwd(e.target.value)}
                                    value={matchNewPwd}
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby='match-new-pwd-note'
                                />
                            </Form.Group>

                            <Container className="mt-3">
                                <Button style={{
                                    border: "2px solid black",
                                    backgroundColor: "black",
                                    padding: "1rem 1rem",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    color: "white",
                                    width: "60%",
                                }}
                                >Update</Button>
                            </Container>
                        </Form>
                    </Card.Body>

                    <Card style={{
                        borderBottom: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        borderTopRightRadius: "0",
                        borderTopLeftRadius: "0"
                    }}>
                        <Card.Title className="mt-3">Minor</Card.Title>
                        <Card.Body>
                            <Button style={{
                                border: "2px solid black",
                                backgroundColor: "black",
                                padding: "1rem 1rem",
                                borderRadius: "10px",
                                cursor: "pointer",
                                color: "white",
                                width: "60%",
                            }}
                                onClick={minorForm}
                                id="minorBtn"
                            >Change Minor</Button>
                            <Form hidden={minorFormHidden} className="mt-3">
                                <Form.Group style={{alignItems: "left"}}>
                                    <Form.Label><strong>Minor:</strong> Applied Mathematics</Form.Label>
                                    <Form.Select>
                                        {VALID_MINORS.map((availableMinor, idx) => {
                                                return (
                                                    <option key={idx}>{availableMinor}</option>
                                                );
                                            })
                                        }
                                    </Form.Select>

                                    <Container className="mt-3">
                                        <Button style={{
                                            border: "2px solid black",
                                            backgroundColor: "black",
                                            padding: "1rem 1rem",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            color: "white",
                                            width: "60%",
                                        }}
                                        >Update</Button>
                                    </Container>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card style={{
                        borderBottom: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        borderTopRightRadius: "0",
                        borderTopLeftRadius: "0"
                    }}>
                        <Card.Title className="mt-3">Tag</Card.Title>
                        <Card.Body>
                            <Button style={{
                                border: "2px solid black",
                                backgroundColor: "black",
                                padding: "1rem 1rem",
                                borderRadius: "10px",
                                cursor: "pointer",
                                color: "white",
                                width: "60%",
                            }}
                                onClick={tagForm}
                                id="tagBtn"
                            >Change Tag</Button>
                            <Form hidden={tageFormHidden} className="mt-3">
                                <Form.Group style={{alignItems: "left"}}>
                                    <Form.Label><strong>Tag: </strong>Technology</Form.Label>
                                    <Form.Select>
                                        {TAGS.map((availableTag, idx) => {
                                                return (
                                                    <option key={idx}>{availableTag}</option>
                                                );
                                            })
                                        }
                                    </Form.Select>

                                    <Container className="mt-3">
                                        <Button style={{
                                            border: "2px solid black",
                                            backgroundColor: "black",
                                            padding: "1rem 1rem",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            color: "white",
                                            width: "60%",
                                        }}
                                        >Update</Button>
                                    </Container>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Card>
            </Card>
        </Container>
    );
}

export default Account;