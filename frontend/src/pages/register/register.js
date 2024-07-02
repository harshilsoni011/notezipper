import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/loadder/loader";
import ErrorMessage from "../../components/error/error";
// import { register } from "../../actions/userActions";
import Common from "../../components/common";
import axios from "axios";
import { login } from "../../actions/userActions";

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [profilePhoto, setPic] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const userLogin = useSelector((state) => state.userLogin)
    const { loggedInUser } = userLogin

    useEffect(() => {
        if (loggedInUser) {
            navigate('/notes')
        }
        navigate("/register");
    }, [navigate, loggedInUser]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setMessage("Password and confrim password must be same...");
        }
        if (!name || !password || !email) {
            return setMessage("Please Enter Details...");
        }
        const allowedPhotoType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        if (profilePhoto && !(allowedPhotoType.includes(profilePhoto.type))) {
            return setPicMessage("Please select only jpg jpeg png files ..")
        }
        formData.append("profilePhoto", profilePhoto);

        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };

            setLoading(true);
            // const { data } = await axios.post('/users/register', formData, config);

            await axios.post('/users/register', formData, config).then((res) => {
                if (res?.data?.data?.token) {
                    setLoading(false);
                    setMessage(null);
                    setPicMessage(null);
                    document.cookie = "token=" + res.data?.data?.token
                    dispatch({ type: "USER_LOGIN_SUCCESS", payload: res?.data?.data })
                }
            }).catch((error) => {
                console.log("🚀 ~ file: register.js:64 ~ awaitaxios.post ~ error:", error)
                setLoading(false);
                setMessage(null);
                setPicMessage(null);
            });

        } catch (error) {
            console.error("Registration Error:", error);
            setError(error.response.data.message);
            setLoading(false);
        }
        navigate('/notes')
    };

    return (
        <Common title="REGISTER">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    {picMessage && (
                        <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                    )}
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control type="file" size="md" onChange={(e) => setPic(e.target.files[0])} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Have an Account ? <Link to="/login" className="loginLink">Login</Link>
                    </Col>
                </Row>
            </div>
        </Common>
    );
}

export default Register;