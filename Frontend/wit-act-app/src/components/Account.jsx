import React, { useState } from "react";
import {Container, Form, Button, Card} from "react-bootstrap";

export const Account = () => {

    const [success, setSuccess] = useState('');

    const [formHidden, setFormHidden] = useState(true);

    const [majorSelectHidden, setMajorSelectHidden] = useState(true);
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

        if (formHidden) {
            setFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white"
        } else {
            setFormHidden(true);
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
                    <Card.Body>
                        <Button style={{
                            border: "2px solid black",
                            backgroundColor: "black",
                            padding: "1rem 7rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "white",
                            width: "60%"
                        }} onClick={pwdForm} id="pwdBtn">Update Password</Button>

                        <Form hidden={formHidden} className="mt-3">
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
                                    padding: "1rem 7rem",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    color: "white",
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
                        <Card.Title className="mt-3">Major</Card.Title>
                        <Card.Body>
                            <Form>
                                <Form.Group style={{alignItems: "left"}}>
                                    <Form.Label><strong>Major: </strong>Computer Science <Button style={{
                                        border: "2px solid black",
                                        backgroundColor: "black",
                                        padding: "0",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        color: "white",
                                        fontSize: "14px",
                                        marginLeft: "5rem"
                                    }}
                                        onClick={() => setMajorSelectHidden(!majorSelectHidden)}
                                    >Change Major</Button></Form.Label>
                                    <Form.Select hidden={majorSelectHidden}>

                                    </Form.Select>
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
                        <Card.Title className="mt-3">Minor</Card.Title>
                        <Card.Body>
                            <Form>
                                <Form.Group style={{alignItems: "left"}}>
                                    <Form.Label><strong>Minor:</strong> Applied Mathematics <Button style={{
                                        border: "2px solid black",
                                        backgroundColor: "black",
                                        padding: "0",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        color: "white",
                                        fontSize: "14px",
                                        marginLeft: "4rem"
                                    }}
                                        onClick={() => setMinorSelectHidden(!minorSelectHidden)}
                                    >Change Minor</Button></Form.Label>
                                    <Form.Select hidden={minorSelectHidden}>

                                    </Form.Select>
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
                            <Form>
                                <Form.Group style={{alignItems: "left"}}>
                                    <Form.Label><strong>Tag: </strong>Technology <Button style={{
                                        border: "2px solid black",
                                        backgroundColor: "black",
                                        padding: "0",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        color: "white",
                                        fontSize: "14px",
                                        marginLeft: "10rem"
                                    }}
                                         onClick={() => setTagSelectHidden(!tagSelectHidden)}
                                    >Change Tag</Button></Form.Label>
                                    <Form.Select hidden={tagSelectHidden}>

                                    </Form.Select>
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