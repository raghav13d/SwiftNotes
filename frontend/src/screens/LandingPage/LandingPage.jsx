import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import './LandingPage.css'
import LandingPageLogo from './LandingPageLogo.jsx';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate=useNavigate();
    useEffect(() => {
        const userInfo=localStorage.getItem('userInfo')
        if(userInfo){
            navigate('/mynotes')
        }
    },[])

    return (
        <div className='main'>
            <Container>
                <div className='mainbox'>
                    {/* <Row>
                        <LandingPageLogo />
                    </Row> */}
                    <Row>
                        <div className="intro-text">
                            <div>
                                <h1 className='title'>Organize your notes, todos, and tasks all in one place</h1>
                                <p className='subtitle'>Quickly jot down todos that you can access from anywhere.</p>
                            </div>
                            <div className="buttonContainer">
                                <Link to="/login">
                                    <Button size='lg' className='landingbutton'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant='secondary-outline'
                                        size='lg' className='landingbutton'>
                                        SignUp
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Row>
                </div>


            </Container>
        </div>
    )
}

export default LandingPage