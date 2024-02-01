import { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";


const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [register, {isLoading}] = useRegisterMutation();

    useEffect(()=> {
        if(userInfo ) {
            navigate('/')
        }
    }, [navigate, userInfo])


    const submitHandler = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error('Passwords do not match')
        }
        else {
            try {
                const res = await register( {name, email, password} ).unwrap();
                dispatch(setCredentials({...res}))
                toast.success('Registered User')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>

        <Form onSubmit={submitHandler} >
        <Form.Group className="my-2" controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)} >
                    
                </Form.Control>
            </Form.Group>


            <Form.Group className="my-2" controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)} >
                    
                </Form.Control>
            </Form.Group>


            <Form.Group className="my-2" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)} >
                    
                </Form.Control>


            </Form.Group>
            <Form.Group className="my-2" controlId='confirmPassword'>
                <Form.Label>Confirm </Form.Label>
                <Form.Control type="password"placeholder="Confirm Password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} >
                    
                </Form.Control>
            </Form.Group>
                
                    {isLoading && <Loader />}

            <Button type="submit" variant="primary" className="mt-3">
                Sign Up
            </Button>

            <Row className="py-3">
                <Col>
                Already have an account? <Link to={"/login"}>Login</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen