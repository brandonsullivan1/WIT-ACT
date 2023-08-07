import React, {useEffect, useState} from "react";
import {Container, Form, Button, Card} from "react-bootstrap";
import {DISCORD_REGEX, PHONE_NUMBER_REGEX} from "../Validation/FormValidation";
import axios from "axios";

export const ContactInfo = () => {

    const [phoneNumberFormValidated, setPhoneNumberFormValidated] = useState(false);
    const [phoneFormHidden, setPhoneFormHidden] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [phoneNumberForm, setPhoneNumberForm] = useState({
        phoneNumber: '',
    });

    const [phoneNumberFormErrors, setPhoneNumberFormErrors] = useState({});

    const setPhoneNumberField = (field, value) => {
        setPhoneNumberForm({
            ...phoneNumberForm,
            [field]: value
        })

        if (!!phoneNumberFormErrors[field]) setPhoneNumberFormErrors({
            ...phoneNumberFormErrors,
            [field]: null
        })
    }

    const validatePhoneNumberForm = () => {
        const {
            phoneNumber,
        } = phoneNumberForm;

        const newErrors = {};

        if (!validPhoneNumber || phoneNumber === '') newErrors.phoneNumber = 'Please enter a valid phone number.';

        return newErrors;
    }

    const handlePhoneNumberFormSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validatePhoneNumberForm();

        if (Object.keys(formErrors).length > 0) {
            setPhoneNumberFormErrors(formErrors);
        } else {
            setPhoneNumberFormValidated(true);
            try{
                const response = await axios.post("http://localhost:3100/users/updatePhone", {
                    phone: phoneNumber,
                    userid: "Dummy-UserID"
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Mode': 'cors'
                    }
                });
                if(!(response.status <= 200 && response.status <= 299)) {
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

    const showPhoneNumberForm = () => {
        const btn = document.getElementById('phoneBtn');

        if (phoneFormHidden) {
            setPhoneFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white";
        } else {
            setPhoneFormHidden(true);
            btn.style.color = "white";
            btn.style.backgroundColor = "black";
        }
    }

    useEffect(() => {
        if (phoneNumber !== '') {
            const result = PHONE_NUMBER_REGEX.test(phoneNumber);
            setValidPhoneNumber(result);
        }
    }, [phoneNumber])

    const [discordFormValidated, setDiscordFormValidated] = useState(false);
    const [discordFormHidden, setDiscordFormHidden] = useState(true);
    const [discord, setDiscord] = useState('');
    const [validDiscord, setValidDiscord] = useState(false);
    const [discordForm, setDiscordForm] = useState({
        discord: '',
    });

    const [discordFormErrors, setDiscordFormErrors] = useState({});
    const setDiscordFormField = (field, value) => {
        setDiscordForm({
            ...discordForm,
            [field]: value
        })

        if (!!discordFormErrors[field]) setDiscordFormErrors({
            ...discordFormErrors,
            [field]: null
        })
    }

    const validateDiscordForm = () => {
        const {
            discord,
        } = discordForm;

        const newErrors = {};

        if (!validDiscord || discord === '') newErrors.discord = 'Please enter a valid discord username.';

        return newErrors;
    }

    const handleDiscordFormSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateDiscordForm();

        if (Object.keys(formErrors).length > 0) {
            setDiscordFormErrors(formErrors);
        } else {
            setDiscordFormValidated(true);
            try{
                const response = await axios.post("http://localhost:3100/users/updateDiscord", {
                    discord: discord,
                    userid: "Dummy-UserID"
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Mode': 'cors'
                    }
                });
                if(!(response.status <= 200 && response.status <= 299)) {
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

    const showDiscordForm = () => {
        const btn = document.getElementById('discordBtn');

        if (discordFormHidden) {
            setDiscordFormHidden(false);
            btn.style.color = "black";
            btn.style.backgroundColor = "white"
        } else {
            setDiscordFormHidden(true);
            btn.style.color = "white";
            btn.style.backgroundColor = "black"
        }
    }

    useEffect(() => {
        if (discord !== '') {
            const result = DISCORD_REGEX.test(discord);
            setValidDiscord(result);
        }
    }, [discord])

    // pull user's registered phone number and discord if available and display

    return (
        <Container>
            <Card>
                <Card.Title className="mt-3">Contact Information</Card.Title>

                <Card style={{
                    borderBottom: "none",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTopRightRadius: "0",
                    borderTopLeftRadius: "0"
                }}>
                    <Card.Title className="mt-3">Phone Number:</Card.Title>
                    <Card.Body>
                        <Button style={{
                            border: "2px solid black",
                            backgroundColor: "black",
                            padding: "1rem 1rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "white",
                            width: "60%",
                        }} onClick={showPhoneNumberForm} id="phoneBtn">Update Phone Number</Button>
                        <Form hidden={phoneFormHidden} className="mt-3" noValidate validated={phoneNumberFormValidated} onSubmit={handlePhoneNumberFormSubmit}>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label>Phone Number:</Form.Label>
                                <Form.Control
                                    required={true}
                                    type="text"
                                    id="phoneNumber"
                                    placeholder="Phone number"
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                        setPhoneNumberField('phoneNumber', e.target.value);
                                    }}
                                    value={phoneNumber}
                                    isInvalid={!!phoneNumberFormErrors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">{phoneNumberFormErrors.phoneNumber}</Form.Control.Feedback>
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
                </Card>

                <Card style={{
                    borderBottom: "none",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTopRightRadius: "0",
                    borderTopLeftRadius: "0"
                }}>
                    <Card.Title className="mt-3">Discord</Card.Title>
                    <Card.Body>
                        <Button style={{
                            border: "2px solid black",
                            backgroundColor: "black",
                            padding: "1rem 1rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "white",
                            width: "60%",
                        }} onClick={showDiscordForm} id="discordBtn">Update Discord</Button>
                        <Form hidden={discordFormHidden} className="mt-3" noValidate validated={discordFormValidated} onSubmit={handleDiscordFormSubmit}>
                            <Form.Group controlId="discord">
                                <Form.Label>Discord:</Form.Label>
                                <Form.Control
                                    required={true}
                                    type="text"
                                    id="discord"
                                    placeholder="Discord"
                                    onChange={(e) => {
                                        setDiscord(e.target.value);
                                        setDiscordFormField('discord', e.target.value);
                                    }}
                                    value={discord}
                                    isInvalid={!!discordFormErrors.discord}
                                />
                                <Form.Control.Feedback type="invalid">{discordFormErrors.discord}</Form.Control.Feedback>
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
                </Card>
            </Card>
        </Container>
    );
}

export default ContactInfo;