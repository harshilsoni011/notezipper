import { Button, Container, Row } from "react-bootstrap";
import "../../assets/css/landingPage.css"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const LandingPage = () => {

    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, loggedInUser } = userLogin

    useEffect(() => {
        const token = document.cookie.split('=').at(1);
        if (loggedInUser) { //  if (token) {
            navigate("/notes");
        }
    }, [navigate]);

    return <div className="main">
        <Container>
            <Row>
                <div className="intro-text">
                    <div>
                        <h1 className="title">Welcome to Note Zipper</h1>
                        <p className="subtitle">One Safe place for all your notes.</p>
                    </div>
                    <div className="buttonContainer">
                        <Link to={"/login"}>
                            <Button size="lg" className="landingbutton">
                                Login
                            </Button>
                        </Link>
                        <Link to={"/register"}>
                            <Button variant="outline-primary" size="lg" className="landingbutton">
                                Signup
                            </Button>
                        </Link>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
}

export default LandingPage;