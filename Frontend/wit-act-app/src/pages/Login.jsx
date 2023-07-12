import React, { useState, useRef, useEffect } from "react"
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TEST_EMAIL = 'sullivanb13@wit.edu';
const TEST_PASSWORD = 'TestPassword1!';

export const Login = () => {
    const navigate = useNavigate();

    const registrationLink = () => {
        navigate("/register");
    }

    const verificationLink = () => {
        navigate('/verification');
    }

    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch("/users").then(
            res => res.json()
        ).then(
            resData => {
                setData(resData)
            }
        )
    }, [])

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const result = email === data["Email"];
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = password === TEST_PASSWORD;
        setValidPassword(result);
    }, [password])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = email === TEST_EMAIL;
        const v2 = password === TEST_PASSWORD;
        if (!v1 || !v2) {
            setErrMsg('Invalid Login');
            return;
        }
        setSuccess(true);
    }

    return (
        <div>
            {success ? (
                <section></section>
            ) : (
                <div>
                    <div className="auth-form-container">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h2>Login</h2>
                        <Form className="login-form" onSubmit={handleSubmit}>
                            <Form.Label htmlFor="email">Email:</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                name="email"
                                placeholder="student@wit.edu"
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                reguired
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />
                            <Form.Label htmlFor="password">Password:</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                name="password"
                                placeholder="********"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />
                            <Button type="submit" onClick={verificationLink} disabled={!validEmail || !validPassword} style={{border: "none", backgroundColor: "white", padding: "20px", borderRadius: "10px", cursor: "pointer", color: "black"}}>Login</Button>
                        </Form>
                    </div>
                    <div className="auth-form-container" style={{paddingTop: "10px", paddingBottom: "5px"}}>
                        <p>Don't have an account? <a onClick={registrationLink} style={{ border: "none", background: "none", color: "white", textDecoration: "underline", cursor: "pointer" }}>Register here.</a></p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;