import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Common from '../../components/common'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/loadder/loader';
import ErrorMessage from '../../components/error/error';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, loggedInUser } = userLogin

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Common title={"LOGIN"}>
            <div className='loginContainer'>
                {loading && <Loader size={"500"} />}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            value={email}
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={password}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

            <Row className="py-3">
                <Col>
                    New Customer ? <Link to="/register" className='registerLink'>Register Here</Link>
                </Col>
            </Row>
        </Common>
    )
}

export default Login
