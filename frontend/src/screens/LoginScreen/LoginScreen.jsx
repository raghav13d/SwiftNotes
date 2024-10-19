import MainScreen from '../../components/MainScreen'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    //In this case, the function is (state) => state.userLogin, 
    //which means it will return the userLogin object from the Redux store.
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    console.log(userInfo);
    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes')
        }
    }, [userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    };

    return (
        <MainScreen title='Login'>
            <div className="loginContainer">
                {error && <ErrorMessage variant='danger'> {error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' value={email} placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant='primary' type='submit' className='mt-3'>
                        Submit
                    </Button>

                    <Row className='py-3'>
                        <Col>
                            New Customer? <Link to='/register'>Register</Link>
                        </Col>
                    </Row>

                </Form>
            </div>

        </MainScreen>
    )
}

export default LoginScreen