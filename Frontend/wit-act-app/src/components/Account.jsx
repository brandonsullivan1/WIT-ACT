import React, {useEffect, useState} from "react";
import {Container, Form, Button, Card} from "react-bootstrap";
import {VALID_MINORS, TAGS, PWD_REGEX} from "../Validation/FormValidation";
import axios from "axios";

/*
    This file is exported to the Profile file.

    This file contains the forms for a user to change their password,
    add/or change their major, and/or change their tag.
 */

export const Account = () => {

    const [passwordFormValidated, setPasswordFormValidated] = useState(false);
    const [passwordFormHidden, setPasswordFormHidden] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmCurrentPassword, setConfirmCurrentPassword] = useState(false);
    const [validCurrentPassword, setValidCurrentPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [validNewPassword, setValidNewPassword] = useState(false);
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [validConfirmNewPassword, setValidConfirmNewPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [passwordFormErrors, setPasswordFormErrors] = useState({});

    const setPasswordFormField = (field, value) => {
        setPasswordForm({
            ...passwordForm,
            [field]: value
        })

        if(!!passwordFormErrors[field]) setPasswordFormErrors({
            ...passwordFormErrors,
            [field]: null
        })
    }

    const validatePasswordForm = () => {
        const {
            currentPassword,
            newPassword,
            confirmNewPassword,
        } = passwordForm;

        const newErrors = {};
        // TODO check DB for password here (assume userID will be accessed from context)
        if (!currentPassword || currentPassword === '') newErrors.currentPassword = 'Incorrect password.';
        if (!validNewPassword || !newPassword || newPassword === '') newErrors.newPassword = 'Please enter a valid password';
        if (!validConfirmNewPassword || !confirmNewPassword || confirmNewPassword === '') newErrors.confirmNewPassword = 'Passwords must match';

        return newErrors;
    }

    const handlePasswordFormSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validatePasswordForm();

        if (Object.keys(formErrors). length > 0) {
            setPasswordFormErrors(formErrors);
        } else {
            setPasswordFormValidated(true);
            try{
                const response = await axios.post("http://localhost:3100/users/updatePassword", {
                    password: newPassword,
                    userid: "Dummy-UserID"
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Mode': 'cors'
                    }
                });
                if(response.status < 200 || response.status > 299) {
                    console.log("Error: " + response);
                } else {
                    console.log(response);
                }
            }
            catch (err){
                console.log(err)
            }
        }
    }

    const togglePasswordForm = () => {
        const btn = document.getElementById('pwdBtn');

        if (passwordFormHidden) {
            setPasswordFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white"
        } else {
            setPasswordFormHidden(true);
            btn.style.color = "white";
            btn.style.backgroundColor = "black"
        }
    }

    useEffect(() => {
        // pull user's current password from db and set state

        const testCurrentPassword = currentPassword === confirmCurrentPassword;
        setValidCurrentPassword(testCurrentPassword);

        const testNewPassword = PWD_REGEX.test(newPassword);
        setValidNewPassword(testNewPassword);

        const testConfirmNewPassword = newPassword === confirmNewPassword;
        setValidConfirmNewPassword(testConfirmNewPassword);
    }, [newPassword, confirmNewPassword])

    const [minorFormValidated, setMinorFormValidated] = useState(false);
    const [minorFormHidden, setMinorFormHidden] = useState(true);
    const [minor, setMinor] = useState('(Optional) Select minor...')
    const [minorForm, setMinorForm] = useState({
        newMinor: '',
    });

    const [minorFormErrors, setMinorFormErrors] = useState({});

    const setMinorFormField = (field, value) => {
        setMinorForm({
            ...minorForm,
            [field]: value
        })

        if (!!minorFormErrors) setMinorFormErrors({
            ...minorFormErrors,
            [field]: null
        })
    }

    const validateMinorForm = () => {
        const {
            minor
        } = minorForm;

        const newErrors = {};

        if (!minor || minor === '(Optional) Select minor...') newErrors.minor = 'Please select a minor.';

        return newErrors;
    }

    const handleMinorFormSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateMinorForm();

        if (Object.keys(formErrors).length > 0) {
            setMinorFormErrors(formErrors);
        } else {
            setMinorFormValidated(true);
            try{
                const response = await axios.post("http://localhost:3100/users/updateMinor", {
                    minor: minor,
                    userid: "Dummy-UserID"
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Mode': 'cors'
                    }
                });
                if(response.status < 200 || response.status > 299) {
                    console.log("Error: " + response);
                } else {
                    console.log(response);
                }
            }
            catch (err){
                console.log(err)
            }
        }
    }

    const toggleMinorForm = () => {
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

    const [tagFormValidated, setTagFormValidated] = useState(false);
    const [tagFormHidden, setTagFormHidden] = useState(true);
    const [tag, setTag] = useState('(Optional) Select tag...');
    const [tagForm, setTagForm] = useState({
        newTag: '',
    });

    const [tagFormErrors, setTagFormErrors] = useState({});

    const setTagFormField = (field, value) => {
        setTagForm({
            ...tagForm,
            [field]: value
        })

        if (!!tagFormErrors[field]) setTagFormErrors({
            ...tagFormErrors,
            [field]: null
        })
    }

    const validateTagForm = () => {
        const {
            tag,
        } = tagForm;

        const newErrors = {};

        if (!tag || tag === "(Optional) Select tag...") newErrors.tag = 'Please select a tag.';

        return newErrors;
    }

    const handleTagFormSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateTagForm();

        if (Object.keys(formErrors).length > 0) {
            setTagFormErrors(formErrors);
        } else {
            setTagFormValidated(true);
            try{
                const response = await axios.post("http://localhost:3100/users/updateTag", {
                    tag: tag,
                    userid: "Dummy-UserID"
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Mode': 'cors'
                    }
                });
                if(response.status < 200 || response.status > 299) {
                    console.log("Error: " + response);
                } else {
                    console.log(response);
                }
            }
            catch (err){
                console.log(err)
            }
        }
    }

    const toggleTagForm = () => {
        const btn = document.getElementById('tagBtn');

        if (tagFormHidden) {
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
                        }} onClick={togglePasswordForm} id="pwdBtn">Update Password</Button>

                        <Form hidden={passwordFormHidden} className="mt-3" noValidate validated={passwordFormValidated} onSubmit={handlePasswordFormSubmit}>
                            <Form.Group >
                                <Form.Label>Current Password:</Form.Label>
                                <Form.Control
                                    required
                                    id="currentPassword"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setCurrentPassword(e.target.value);
                                        setPasswordFormField('currentPassword', e.target.value)
                                    }}
                                    value={currentPassword}
                                    isInvalid={!!passwordFormErrors.currentPassword}
                                />
                                <Form.Control.Feedback type="invalid">{passwordFormErrors.currentPassword}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>New Password:</Form.Label>
                                <Form.Control
                                    required
                                    id="newPassword"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setPasswordFormField('newPassword', e.target.value);
                                    }}
                                    value={newPassword}
                                    isInvalid={!!passwordFormErrors.newPassword}
                                />
                                <Form.Control.Feedback type="invalid">{passwordFormErrors.newPassword}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control
                                    required
                                    id="confirmNewPassword"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setConfirmNewPassword(e.target.value);
                                        setPasswordFormField('confirmNewPassword', e.target.value)
                                    }}
                                    value={confirmNewPassword}
                                    isInvalid={!!passwordFormErrors.confirmNewPassword}
                                />
                                <Form.Control.Feedback type="invalid">{passwordFormErrors.confirmNewPassword}</Form.Control.Feedback>
                            </Form.Group>

                            <Container className="mt-3">
                                <Button type="submit" style={{
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
                                    onClick={toggleMinorForm}
                                    id="minorBtn"
                            >Change Minor</Button>
                            <Form hidden={minorFormHidden} className="mt-3" noValidate validated={minorFormValidated} onSubmit={handleMinorFormSubmit}>
                                <Form.Group style={{alignItems: "left"}} >
                                    <Form.Label><strong>Minor:</strong> Applied Mathematics</Form.Label>
                                    <Form.Select
                                        required={true}
                                        id="minor"
                                        name="minor"
                                        className={!!minorFormErrors.minor && 'red-border'}
                                        onChange={(e) => {
                                            setMinor(e.target.value);
                                            setMinorFormField('minor', e.target.value)
                                        }}
                                        value={minor}
                                    >
                                        {VALID_MINORS.map((availableMinor, idx) => {
                                            return (
                                                <option key={idx} value={availableMinor}>{availableMinor}</option>
                                            );
                                        })
                                        }
                                    </Form.Select>

                                    <Container className="red">{minorFormErrors.minor}</Container>

                                    <Container className="mt-3">
                                        <Button type="submit" style={{
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
                                    onClick={toggleTagForm}
                                    id="tagBtn"
                            >Change Tag</Button>
                            <Form hidden={tagFormHidden} className="mt-3" noValidate validated={tagFormValidated} onSubmit={handleTagFormSubmit}>
                                <Form.Group style={{alignItems: "left"}} >
                                    <Form.Label><strong>Tag: </strong>Technology</Form.Label>
                                    <Form.Select
                                        required={true}
                                        id="tag"
                                        name="tag"
                                        className={!!tagFormErrors.tag && 'red-border'}
                                        onChange={(e) => {
                                            setTag(e.target.value);
                                            setTagFormField('tag', e.target.value);
                                        }}
                                        value={tag}
                                    >
                                        {TAGS.map((availableTag, idx) => {
                                            return (
                                                <option key={idx} value={availableTag}>{availableTag}</option>
                                            );
                                        })
                                        }
                                    </Form.Select>

                                    <Container className="red">{tagFormErrors.tag}</Container>

                                    <Container className="mt-3">
                                        <Button type="submit" style={{
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