import React, { useState, useEffect, useRef } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { VALID_MAJORS } from "../validMajors";
import { VALID_MINORS } from "../validMinors";

const NAME_REGEX = /^[A-Z][a-zA-Z- ]+$/;
const EMAIL_REGEX = /[a-z0-9]@wit.edu/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_NUMBER_REGEX = /[0-9].{9}/;



export const Register = () => {
    const navigate = useNavigate();

    const loginLink = () => {
        navigate('/');
    }

    const nameRef = useRef();
    const majorRef = useRef();
    const minorRef = useRef();
    const skillsRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const discordRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [major, setMajor] = useState('');
    const [validMajor, setValidMajor] = useState(false);
    const [majorFocus, setMajorFocus] = useState(false);

    const [minor, setMinor] = useState('');
    const [validMinor, setValidMinor] = useState(false);
    const [minorFocus, setMinorFocus] = useState(false);

    const [skills, setSkills] = useState('');
    const [validSkills, setValidSkills] = useState(false);
    const [skillsFocus, setSkillsFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [discord, setDiscord] = useState('');
    const [discordFocus, setDiscordFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const result = NAME_REGEX.test(name);
        setValidName(result);
    }, [name])

    useEffect(() => {
        const result = VALID_MAJORS.includes(major);
        setValidMajor(result);
    }, [major])

    useEffect(() => {
        const result = VALID_MINORS.includes(minor);
        setValidMinor(result);
    }, [minor])

    useEffect(() => {
        const result = skills.length !== 0;
        setValidSkills(result);
        const skillsList = skills.split(', ');
        console.log(skillsList);
    }, [skills])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PHONE_NUMBER_REGEX.test(phoneNumber);
        setValidPhoneNumber(result);
    }, [phoneNumber])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
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
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = NAME_REGEX.test(name);
        if (!v1 || !v2 || !v3) {
            setErrMsg('Invalid Entry');
            return;
        }
        const skillsList = skills.split(', ');
        console.log(`skillsList: ${skillsList}`);
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                major: major,
                minor: minor,
                skill1: skillsList.shift(),
                skill2: skillsList.shift(),
                skill3: skillsList.shift(),
                skill4: skillsList.shift(),
                skill5: skillsList.shift(),
                email: email,
                phone: phoneNumber,
                discord: discord,
                password: pwd
            })
        }
        await fetch('http://localhost:3100/adduser', request)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if(!response.ok){
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                setSuccess(true);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <Container style={{width: "50%", marginTop: "2rem", marginBottom: "2rem"}}>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                    <Button onClick={loginLink} style={{border: "none", backgroundColor: "white", padding: "20px", borderRadius: "10px", cursor: "pointer", color: "black"}}>Login</Button>
                    </p>
                </section>
            ) : (
                <div>
                    <div className="auth-form-container">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h2>Register</h2>
                        <Form className="register-form" onSubmit={handleSubmit}>
                            <Form.Label htmlFor="name">
                                Full Name:
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"}/>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="name"
                                placeholder="Full Name"
                                ref={nameRef}
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="name-id-note"
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />
                            <p id="name-id-note" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Must be a real name.
                            </p>

                            <Form.Label htmlFor="major">
                                Major:
                                <FontAwesomeIcon icon={faCheck} className={validMajor ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validMajor || !major ? "hide" : "invalid"}/>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="major"
                                placeholder="Major"
                                ref={majorRef}
                                autoComplete="off"
                                onChange={(e) => setMajor(e.target.value)}
                                value={major}
                                required
                                aria-invalid={validMajor ? "false" : "true"}
                                aria-describedby="name-id-note"
                                onFocus={() => setMajorFocus(true)}
                                onBlur={() => setMajorFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />
                            <p id="major-id-note" className={majorFocus && major && !validMajor ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Must be a valid Major at WIT.
                            </p>

                            <Form.Label htmlFor="minor">
                                Minor:
                                <FontAwesomeIcon icon={faCheck} className={validMinor ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validMinor || !minor ? "hide" : "invalid"}/>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="minor"
                                placeholder="(optional)"
                                ref={minorRef}
                                autoComplete="off"
                                onChange={(e) => setMinor(e.target.value)}
                                value={minor}
                                aria-invalid={validMinor ? "false" : "true"}
                                aria-describedby="name-id-note"
                                onFocus={() => setMinorFocus(true)}
                                onBlur={() => setMinorFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />
                            <p id="minor-id-note" className={minorFocus && minor && !validMinor ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Must be a valid Minor at WIT.
                            </p>

                            <Form.Label htmlFor="Skills">
                                Skills:
                                <FontAwesomeIcon icon={faCheck} className={validSkills ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validSkills || !skills ? "hide" : "invalid"}/>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="skills"
                                placeholder="Skill 1, Skill 2, ..."
                                ref={skillsRef}
                                autoComplete="off"
                                onChange={(e) => setSkills(e.target.value)}
                                value={skills}
                                required
                                aria-invalid={validSkills ? "false" : "true"}
                                aria-describedby="skills-id-note"
                                onFocus={() => setSkillsFocus(true)}
                                onBlur={() => setSkillsFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />
                            <p id="skills-id-note" className={skillsFocus && skills && !validSkills ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Must enter at least one skill.
                            </p>


                            <Form.Label htmlFor="email">
                                Email:
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"}/>
                            </Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                placeholder="student@wit.edu"
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="email-id-note"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />
                            <p id="email-id-note" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Must be an active WIT email.
                            </p>

                            <Form.Label htmlFor="phone-number">
                                Phone Number:
                                <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"}/>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="phone-number"
                                placeholder="(optional)"
                                ref={phoneNumberRef}
                                autoComplete="off"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                                aria-invalid={validPhoneNumber ? "false" : "true"}
                                aria-describedby="phone-number-id-note"
                                onFocus={() => setPhoneNumberFocus(true)}
                                onBlur={() => setPhoneNumberFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />
                            <p id="phone-number-id-note" className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Must be a valid phone Number. ex: 1112223333.
                            </p>

                            <Form.Label htmlFor="discord">
                                Discord:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="discord"
                                placeholder="(optional)"
                                ref={discordRef}
                                autoComplete="off"
                                onChange={(e) => setDiscord(e.target.value)}
                                value={discord}
                                onFocus={() => setDiscordFocus(true)}
                                onBlur={() => setDiscordFocus(false)}
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />

                            <Form.Label htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"}/>
                            </Form.Label>
                            <Form.Control
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
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />
                            <p id="pwd-note" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 Characters.<br />
                                Must include uppercase and lowercase letters,<br />
                                a number, and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span>  <span aria-label="at symbol">@</span>  <span aria-label="hashtag">#</span>  <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                            <Form.Label htmlFor="confirm-pwd">
                                Confirm Password:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invlaid"}/>
                            </Form.Label>
                            <Form.Control
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
                                style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                            />
                            <p id="confrim-pwd-note" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Passwords must match.
                            </p>

                            <Button disabled={!validEmail || !validPwd || !validMatch} onClick={handleSubmit} style={{border: "none", backgroundColor: "white", padding: "20px", borderRadius: "10px", cursor: "pointer", color: "black"}} type="submit">Register</Button>
                        </Form>
                    </div>
                    <div className="auth-form-container" style={{paddingTop: "10px", paddingBottom: "5px"}}>
                        <p>Already have an account? <a onClick={loginLink} style={{ border: "none", background: "none", color: "white", textDecoration: "underline" }}>Log in</a></p>
                    </div>
                </div>
            )}
        </Container>
    )
}

export default Register;