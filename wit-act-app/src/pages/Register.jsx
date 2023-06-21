import React, { useState, useEffect, useRef } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";

const NAME_REGEX = /^[A-Z][a-zA-Z- ]+$/;
const EMAIL_REGEX = /[a-z0-9]@wit.edu/;
const VALID_MAJORS = [
    "Applied Mathematics",
    "Applied Sciences",
    "Architecture",
    "Biological Engineering",
    "Biomedical Engineering",
    "Business Management",
    "Civil Engineering",
    "Computer Engineering",
    "Computer Information Systems",
    "Computer Networking",
    "Computer Science",
    "Computer Science + Society",
    "Construction Management",
    "Cybersecurity",
    "Data Science",
    "Eleectrical Engineering",
    "Electromechanical Engineering",
    "Engineering",
    "Industrial Design",
    "Information Technology",
    "Interior Design",
    "Mechanical Engineering"
];
const VALID_MINORS = [
    "Aerospace Engineering",
    "American Studies",
    "Applied Math",
    "Architectural Studies",
    "Biology",
    "Business Analytics",
    "Chemistry",
    "Civil Engineering",
    "Computer Networking",
    "Computer Science",
    "Construction Management",
    "Cybersecurity Management",
    "Data Science",
    "Electrical Engineering",
    "Environmental Engineering",
    "Financial Mathematics",
    "Internet of Things",
    "Manufacturing",
    "Media, Culture, and Communication Studies",
    "Performing Arts",
    "Physics",
    "Science, Technology, and Society",
    "Sustainability"
];
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



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

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMacth, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        nameRef.current.focus();
        majorRef.current.focus();
        minorRef.current.focus();
        emailRef.current.focus();
    }, [])

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
        setSuccess(true);
    }

    return (
        <div className="auth-form-container">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                    <Button onClick={loginLink} style={{border: "none", backgroundColor: "white", padding: "20px", borderRadius: "10px", cursor: "pointer", color: "black"}}>Login</Button>
                    </p>
                </section>
            ) : (
                <Container>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2>Register</h2>
                    <Form className="register-form" onSubmit={handleSubmit}>
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
                            style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                        />
                        <p id="name-id-note" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> Must be a real name.
                        </p>

                        <label htmlFor="major">
                            Major:
                            <FontAwesomeIcon icon={faCheck} className={validMajor ? "valid" : "hide"}/>
                            <FontAwesomeIcon icon={faTimes} className={validMajor || !major ? "hide" : "invalid"}/>
                        </label>
                        <input 
                            type="text" 
                            id="major" 
                            placeholder="Major"
                            ref={majorRef} 
                            autoComplete="off" 
                            onChange={(e) => setMajor(e.target.value)} 
                            value={major}
                            reguired 
                            aria-invalid={validMajor ? "false" : "true"} 
                            aria-describedby="name-id-note"
                            onFocus={() => setMajorFocus(true)}
                            onBlur={() => setMajorFocus(false)}
                            style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                        />
                        <p id="major-id-note" className={majorFocus && major && !validMajor ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> Must be a valid Major at WIT.
                        </p>

                        <label htmlFor="minor">
                            Minor:
                            <FontAwesomeIcon icon={faCheck} className={validMinor ? "valid" : "hide"}/>
                            <FontAwesomeIcon icon={faTimes} className={validMinor || !minor ? "hide" : "invalid"}/>
                        </label>
                        <input 
                            type="text" 
                            id="minor" 
                            placeholder="(optional)"
                            ref={minorRef} 
                            autoComplete="off" 
                            onChange={(e) => setMinor(e.target.value)} 
                            value={minor}
                            reguired 
                            aria-invalid={validMinor ? "false" : "true"} 
                            aria-describedby="name-id-note"
                            onFocus={() => setMinorFocus(true)}
                            onBlur={() => setMinorFocus(false)}
                            style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                        />
                        <p id="minor-id-note" className={minorFocus && minor && !validMinor ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> Must be a valid Minor at WIT.
                        </p>

                        <label htmlFor="Skills">
                            Skills:
                            <FontAwesomeIcon icon={faCheck} className={validSkills ? "valid" : "hide"}/>
                            <FontAwesomeIcon icon={faTimes} className={validSkills || !skills ? "hide" : "invalid"}/>
                        </label>
                        <input 
                            type="text" 
                            id="skills" 
                            placeholder="Skill 1, Skill 2, ..."
                            ref={skillsRef} 
                            autoComplete="off" 
                            onChange={(e) => setSkills(e.target.value)} 
                            value={skills}
                            reguired 
                            aria-invalid={validSkills ? "false" : "true"} 
                            aria-describedby="skills-id-note"
                            onFocus={() => setSkillsFocus(true)}
                            onBlur={() => setSkillsFocus(false)}
                            style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                        />
                        <p id="skills-id-note" className={skillsFocus && skills && !validSkills ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> Must enter at least one skill.
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
                            style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
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
                            style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                        />
                        <p id="pwd-note" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 Characters.<br />
                            Must include uppercase and lowercase letters,<br />
                            a number, and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span>  <span aria-label="at symbol">@</span>  <span aria-label="hashtag">#</span>  <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm-pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMacth && matchPwd ? "valid" : "hide"}/>
                            <FontAwesomeIcon icon={faTimes} className={validMacth || !matchPwd ? "hide" : "invlaid"}/>
                        </label>
                        <input
                            type="password"
                            id="confirm-pwd"
                            placeholder="********"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMacth ? "false" : "true"}
                            aria-describedby="confrim-pwd-note"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            style={{ margin: "0.5rem 0", padding: "1rem", border: "none", borderRadius: "10px" }}
                        />
                        <p id="confrim-pwd-note" className={matchFocus && !validMacth ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> Passwords must match.
                        </p>

                        <Button disabled={!validEmail || !validPwd || !validMacth ? true : false} style={{border: "none", backgroundColor: "white", padding: "20px", borderRadius: "10px", cursor: "pointer", color: "black"}} type="submit">Register</Button>
                    </Form>
                    <Button onClick={loginLink} style={{ border: "none", background: "none", color: "white", textDecoration: "underline" }}>Already have an account? Login here.</Button>
                </Container>
            )}
        </div> 
    )
}

export default Register;