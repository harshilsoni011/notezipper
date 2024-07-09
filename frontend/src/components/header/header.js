import { Container, Form, Nav, NavDropdown, FormControl, Navbar, Image } from 'react-bootstrap'
import { baseUrl } from "../../config/config";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGOUT } from '../../constants/userConstants';

const Header = (props) => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state?.userLogin?.loggedInUser)
    let profilePhoto = `/profilePhotos/c.jpeg`
    if (loggedInUser?.profilePhoto) {
        profilePhoto = `/profilePhotos/${loggedInUser?.profilePhoto}`
    }

    // const handleSearchChange = (e) => {
    //     props.onSearchChange(e.target.value);
    // };

    const onLogout = () => {
        dispatch({ type: USER_LOGOUT })
    }

    return <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
            <Navbar.Brand>
                <Link to={'/notes'}>Note Zipper</Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {loggedInUser && (
                    <>
                        {/* <Nav className='m-auto'>
                            <Form inline="true">
                                <FormControl
                                    type="text"
                                    placeholder='Search..'
                                    className='mr-sm-2'
                                    value={props.searchValue}
                                    onChange={handleSearchChange}
                                />
                            </Form>
                        </Nav> */}
                        <Nav className='m-auto'>
                            {/* <Nav.Link as={Link} to="/notes">
                                My Notes
                            </Nav.Link> */}

                            <Image src={profilePhoto} width={30} height={30} style={{ borderRadius: '30px' }}></Image>
                            <NavDropdown title={props.userEmail} id="navbarScrollingDropdown">
                                <NavDropdown.Item as={Link} to="/my-profile">
                                    My Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} onClick={() => onLogout()} to="/logout">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </>
                )}
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default Header;