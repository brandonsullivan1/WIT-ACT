import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const registrationPage = () => {
        navigate("/register");
    }

    const verificationPage = () => {
        navigate('/verification');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="student@wit.edu" id="email" name="email" />
                <label htmlFor="password">Password:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="Submit" onClick={verificationPage}>Login</button>
            </form>
            <button className="link-btn" onClick={registrationPage}>Don't have an account? Register here.</button>
        </div>
    )
}