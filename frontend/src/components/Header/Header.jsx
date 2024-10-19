import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import { Image } from 'react-bootstrap';
import Icon from '../../assets/Icon';

function Header({ setsearch }) {

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const navigate = useNavigate();

    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
    }

    useEffect(() => {

    }, [userInfo])


    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand >
                    <Link to='/' style={{ textDecoration: 'none' }}><Icon/></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">

                    <Nav className='m-auto'>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => setsearch(e.target.value)}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Nav>


                    {userInfo ? (<Nav
                        className="my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/mynotes">
                            My Todo's
                        </Nav.Link>
                        <NavDropdown title={userInfo.name} id="navbarScrollingDropdown">
                            <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Image src={userInfo.pic} rounded style={{maxWidth:'10%',maxHeight:'inherit',objectFit:'cover'}} />
                    </Nav>) : (
                        <Nav.Link as={Link} to="/login">
                            <Button variant="outline-success">Login</Button>
                        </Nav.Link>
                    )}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header