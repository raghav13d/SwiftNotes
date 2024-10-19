import React from 'react'
import MainScreen from '../../components/MainScreen'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useState,useEffect } from 'react';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { updateProfile } from '../../actions/userActions';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ProfilePage = () => {
    const profileStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const imgStyle={
        margin:'auto',
        maxWidth: '50%'
    }
    

    const imgName = 'Choose Image';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pic, setPic] = useState('https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg');
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPic(userInfo.pic);
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(updateProfile({ name, email, password, pic }));
        }
    }

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
        <MainScreen title='Edit Profile'>
            <div>
                <Row className='profileContainer'>
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {loading && <Loading />}
                            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                            {success && <ErrorMessage variant='success'>Profile Updated Successfully</ErrorMessage>}
                            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>
                            {picMessage && (
                                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                            )}
                            <Form.Group controlId='pic'>
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control
                                    onChange={(e) => postDetails(e.target.files[0])}
                                    type='file'
                                    label={imgName}
                                />
                            </Form.Group>

                            <Button type='submit' variant='primary' className='mt-2'>
                                Update
                            </Button>
                        </Form>
                    </Col>

                    <Col style={profileStyle}>
                        <img style={imgStyle} src={pic} alt={imgName} className='profilePic' />
                    </Col>

                </Row>
            </div>
        </MainScreen>
    )
}

export default ProfilePage