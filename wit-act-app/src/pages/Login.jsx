import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const TEST_EMAIL = "sullivanb13@wit.edu";
const TEST_PASSWORD = "TestPassword1!";

export const Login = () => {
    const navigate = useNavigate();

    const registrationLink = () => {
        navigate("/register");
    }

    const verificationLink = () => {
        navigate('/verification');
    }

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
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        const result = email === TEST_EMAIL;
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
        <div className="auth-form-container">           
            {success ? (
                <section></section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2>Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input 
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
                        />
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <button type="submit" onClick={verificationLink} disabled={!validEmail || !validPassword ? true : false}>Login</button>
                    </form>
                    <button className="link-btn" onClick={registrationLink}>Don't have an account? Register here.</button>
                </section>
            )}
        </div>
    )
}

            