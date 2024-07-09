import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, CardBody, CardTitle } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/loadder/loader";
import ErrorMessage from "../../components/error/error";
import Common from "../../components/common";


function ProfileScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loggedInUser } = userLogin;

    // const userUpdate = useSelector((state) => state.userUpdate);
    // const { loading, error, success } = userUpdate;

    useEffect(() => {
        if (!loggedInUser) {

        } else {
            setName(loggedInUser.name);
            setEmail(loggedInUser.email);
            setPic(loggedInUser.pic);
        }
    }, [loggedInUser]);

    const postDetails = (pics) => {
        setPicMessage(null);

    };

    const submitHandler = (e) => {
        const id = loggedInUser._id;
        e.preventDefault();
        if (password !== confirmPassword) {
            return setMessage("Password and conform password must be same...");
        }
        if (!name || !password || !email) {
            return setMessage("Please Enter Details...");
        }
        dispatch(updateProfile({ name, email, password, pic, id }));
    };

    return (
        <Common title="EDIT PROFILE">
            <div className="EditProfile">
                <Row className="profileContainer">
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {/* {loading && <Loading />}
                            {success && (
                                <ErrorMessage variant="success">
                                    Updated Successfully
                                </ErrorMessage>
                            )}
                            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>{" "}
                            {picMessage && (
                                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                            )}
                            <Form.Group controlId="formFileSm" className="mb-3">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control type="file" size="md" onChange={(e) => postDetails(e.target.files[0])} />
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img src={pic} alt={name} className="profilePic" />
                    </Col>
                </Row>
            </div>
        </Common>
    );
};

export default ProfileScreen;