import { CardFooter, Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    return <footer style={{bottom : 0, position: "absolute"}}>
        <Container>
            <Row>
                <Col className="text-center py-3">Copyright &copy; Note Zipper</Col>
            </Row>
        </Container>
    </footer>
}

export default Footer;