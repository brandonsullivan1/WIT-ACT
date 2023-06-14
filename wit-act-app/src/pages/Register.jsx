import React, { useState, useEffect, useRef } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';

const EMAIL_REGEX = /[a-z0-9]@wit.edu/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /^[A-Z][a-zA-Z- ]+$/;
const REGISTER_URL = '/register';

export const Register = () => {
    const navigate = useNavigate();

    const loginLink = () => {
        navigate('/');
    }

    const emailRef = useRef();
    const nameRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // focus name on initial visit
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        const result = NAME_REGEX.test(name);
        console.log(result);
        console.log(name);
        setValidName(result);
    }, [name])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // handling JS hack
        const v1 = NAME_REGEX.test(name);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || !v3) {
            setErrMsg('Invalid Entry');
            return;
        }
        try {
            // in case this fails: stringify({ backend_name: frontend_var, ... })
            // name specification unnecessary if name is the same front/back
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ name, email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log(response.data);
            // console.log(response.accessToken); //copied from tutorial, in case we use the same node backend setup
            console.log(JSON.stringify(response)); //log entire response
            setSuccess(true);
            // reset everything
            setName(''); setEmail(''); setPwd(''); setMatchPwd('');
            setValidName(false); setValidEmail(false); setValidPwd(false); setValidMatch(false);
            nameRef.current.focus();
        }
        catch (err) {
            switch(err) {
                case !err?.response:
                    setErrMsg('No Server Response');
                    break;
                case err.response?.status === 409:
                    // 409 - Conflict w/ requested resource
                    setErrMsg('Username Taken');
                    break;
                default:
                    setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="auth-form-container">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                    <button className="link-btn" onClick={loginLink}><a>Login</a></button>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2>Register</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            Full Name:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"}/>
                            <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"}/>
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Full Name"
                            ref={nameRef} 
                            autoComplete="off" 
                            onChange={(e) => setName(e.target.value)} 
                            value={name}
                            reguired 
                            aria-invalid={validName ? "false" : "true"} 
                            aria-describedby="name-id-note"
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />
                        <p id="name-id-note" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> Must be a real name.
                        </p>

                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"}/>
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"}/>
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="student@wit.edu" 
                            ref={emailRef} 
                            autoComplete="off" 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                            reguired 
                            aria-invalid={validEmail ? "false" : "true"} 
                            aria-describedby="email-id-note"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="email-id-note" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> Must be an active WIT email.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"}/>
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"}/>
                        </label>
                        <input 
                            type="password"
                            id="password"
                            placeholder="********"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwd-note"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwd-note" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 Characters.<br />
                            Must include uppercase and lowercase letters, a number, and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span>  <span aria-label="at symbol">@</span>  <span aria-label="hashtag">#</span>  <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm-pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"}/>
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invlaid"}/>
                        </label>
                        <input
                            type="password"
                            id="confirm-pwd"
                            placeholder="********"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confrim-pwd-note"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confrim-pwd-note" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> Passwords must match.
                        </p>

                        <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Register</button>
                    </form>
                    <button className="link-btn" onClick={loginLink}>Already have an account? Login here.</button>
                </section>
            )}
        </div> 
    )
}