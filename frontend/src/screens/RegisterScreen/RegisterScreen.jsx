import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pic, setPic] = useState(
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    );
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    console.log(userInfo);
    
    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes');
        }
    }, [userInfo])


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password, pic));
        }
    };

    const postDetails = async (pics) => {
        try {
            if (
                pics ===
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            ) {
                return setPicMessage("Please Select an Image");
            }
            setPicMessage(null);
            if (pics.type === "image/jpeg" || pics.type === "image/png") {
                const data = new FormData();
                data.append("file", pics);
                data.append("upload_preset", "swiftnotes");
                data.append("cloud_name", "drc4pzejo");
                const res = await axios.post(
                    "https://api.cloudinary.com/v1_1/drc4pzejo/image/upload",
                    data
                );
                console.log(res.data);
                setPic(res.data.url.toString());
            } else {
                return setPicMessage("Please Select an Image");
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <MainScreen title="Register">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmpassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    {picMessage && (<ErrorMessage variant="danger" >{picMessage}</ErrorMessage>)}
                    <Form.Group controlId="pic">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control onChange={(e) => postDetails(e.target.files[0])} type="file" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='mt-3'>
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Have an Account? <Link to="/login">Login</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
};

export default RegisterScreen;
