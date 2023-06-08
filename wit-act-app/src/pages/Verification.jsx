import React, { useState, useEffect, useRef } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const CODE_CHECK = "111111";

export const Verification = () => {
    const navigate = useNavigate();

    const loginPage = () => {
        navigate('/');
    }

    const codeRef = useRef();
    const errRef = useRef();

    const [code, setCode] = useState('');
    const [validCode, setValidCode] = useState(false);
    const [codeFocus, setCodeFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const result = (code === CODE_CHECK);
        console.log(result);
        console.log(code);
        setValidCode(result);
    }, [code])

    const handleSubmit = (e) => {
        e.preventDefault();
        const v1 = (code === CODE_CHECK);
        if (!v1) {
            setErrMsg('Invalid Entry');
            return;
        }
        console.log(code);
        setSuccess(true);
    }

    return (
        <div className="auth-form-container">
            {success ? (
                <section>
                <h1>Success!</h1>
                <p>
                <button className="link-btn" onClick={loginPage}><a>Login</a></button>
                </p>
            </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2>Verify</h2>
                    <form className="verification-form" onSubmit={handleSubmit}>
                        <label htmlFor="verify">
                            Code:
                            <FontAwesomeIcon icon={faCheck} className={validCode ? "valid" : "hide"}/>
                            <FontAwesomeIcon icon={faTimes} className={validCode || !code ? "hide" : "invalid"}/>
                        </label>
                        <input 
                            type="text"
                            id="code"
                            placeholder="000000"
                            ref={codeRef}
                            autoComplete="off"
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                            required
                            aria-invalid={validCode ? "false" : "true"}
                            aria-describedby="code-id-note"
                            onFocus={() => setCodeFocus(true)}
                            onBlur={() => setCodeFocus(false)}
                        />
                        <p id="code-id-note" className={codeFocus && code && !validCode ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> Must be the same code recieved via email.
                        </p>
                        <button type="submit">Verify</button>
                    </form>
                    <button className="link-btn" onClick={loginPage}>Back to login.</button>
                </section>
            )}
        </div>
    )
}