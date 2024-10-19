import './App.css';
import React from 'react';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import LandingPage from './screens/LandingPage/LandingPage.jsx';
import { HashRouter, Route, Routes} from 'react-router-dom';
import MyNotes from './screens/MyNotes/MyNotes.jsx';
import LoginScreen from './screens/LoginScreen/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen.jsx';
import CreateNote from './screens/CreateNote/CreateNote.jsx';
import SingleNote from './screens/SingleNote/SingleNote.jsx';
import ProfilePage from './screens/ProfilePage/ProfilePage.jsx';
import { useState } from 'react';
import Icon from './assets/Icon';

const App = () => {
    const [search, setsearch] = useState("")
    return (
        <HashRouter>
            <Header setsearch={setsearch}/>
            <main>
                <Routes> {/* Use Routes component */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/mynotes" element={<MyNotes search={search}/>} />
                    <Route path="/createnote" element={<CreateNote />} />
                    <Route path="/note/:id" element={<SingleNote />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </main>
            <Footer />
        </HashRouter>
    );
};

export default App;
