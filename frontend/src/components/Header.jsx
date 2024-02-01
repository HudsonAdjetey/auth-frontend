import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { clearCredentials } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/usersApiSlice'

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()

    const logoutHandler = async() =>{
        try {
            await logout().unwrap()
            dispatch(clearCredentials())
            navigate('/')

        } catch (error) {
            console.log(err)
        }
    }


return (
    <header>
        <Navbar bg='dark' variant='dark' expand ='lg' collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand href='/'>MERN Auth</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto' >

                        { userInfo ? (

                            <>
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to={'/profile'}>
                                    <NavDropdown.Item eventKey="1">Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                            </NavDropdown>
                            
                            </>
                        ) : (

                            <>
                            <LinkContainer to={"/login"}>
                            <Nav.Link >
                                <FaSignInAlt /> Sign In
                            </Nav.Link>
                            </LinkContainer>
    
                            <LinkContainer to={"/register"}>
                            <Nav.Link >
                                <FaSignOutAlt /> Sign Up
                            </Nav.Link>
                            </LinkContainer>
                            
                            </>
                        ) }

           
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
)
}

export default Header