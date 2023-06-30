import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export const Account = () => {

    const [success, setSuccess] = useState('');

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [newPwd, setNewPwd] = useState('');
    const [validNewPwd, setValidNewPwd] = useState(false);
    const [newPwdFocus, setNewPwdFocus] = useState(false);

    const [matchNewPwd, setMatchNewPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    return (
        <Container className="d-flex flex-column min-vh-100 mw-100">
            {success ? (
                <></>
            ) : (
                <Container className="d-flex flex-column">
                    <h3 className="mt-3">Account</h3>
                    <Button>Update Password</Button>
                    <Form>
                        <Form.Label>Current Password:</Form.Label>
                        <Form.Control 
                            type="password"
                            id="password"
                            placeholder="********"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwd-note"
                            onFocus={() => setPwdFocus(password)}
                            onBlur={() => setPwdFocus(true)}
                            style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                        />
                        <Form.Label>New Password:</Form.Label>
                        <Form.Control 
                            type="password"
                            id="new-pwd"
                            placeholder="********"
                            onChange={(e) => setNewPwd(e.target.value)}
                            value={newPwd}
                            required
                            aria-invalid={validNewPwd ? "false" : "true"}
                            aria-describedby="new-pwd-note"
                            onFocus={() => setNewPwdFocus(password)}
                            onBlur={() => setNewPwdFocus(true)}
                            style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                        />
                        <Form.Label>Confirm New Password:</Form.Label>
                        <Form.Control 
                            type="password"
                            id="confirm-pwd"
                            placeholder="********"
                            onChange={(e) => setMatchNewPwd(e.target.value)}
                            value={matchNewPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confrim-pwd-note"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                        />
                    </Form>
                </Container>
            )}
        </Container>
    )
}

export default Account;