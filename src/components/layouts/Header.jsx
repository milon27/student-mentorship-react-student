import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap'
//import logo from '../img/applogo.png'
import URL from '../../utils/helpers/URL'
export default function Header() {
    return (
        <Container fluid className="mb-5">
            <Row >
                <Col className="shadow">
                    <Navbar className="px-md-5" expand="lg">
                        <Navbar.Brand href={URL.HOME}>
                            {/* <img src={logo} width={50} alt="" />Student Panel */}
                            Student Panel
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Link className="nav-link" to={URL.HOME}> Home</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        </Container >
    )
}
