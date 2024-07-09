import React from 'react'
import { Container, Row } from 'react-bootstrap';
import "../assets/css/common.css"
import { useLocation } from 'react-router-dom';

const Common = ({ title, children }) => {
    const location = useLocation();
    const from = location.state?.from || "/";
    return (
        <div className='mainBack'>
            <Container>
                <Row>
                    <div className='page'>
                        {
                            title && (<>
                                <h1 className='heading'>{title}</h1>
                                <hr />
                            </>)
                        }
                        {children}
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Common
