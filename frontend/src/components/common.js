import React from 'react'
import { Container, Row } from 'react-bootstrap';
import "../assets/css/common.css"

const Common = ({ title, children }) => {
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
