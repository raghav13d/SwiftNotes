import React from 'react';
import MainScreen from '../../components/MainScreen';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Card, Accordion } from 'react-bootstrap';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/notesAction.jsx';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import ReactMarkdown from 'react-markdown';

const MyNotes = ({search}) => {
    const customButtonStyles = {
        fontSize: '20px', // Customize the font size
        padding: '6px 14px', // Customize the padding
        marginLeft: 20,
        marginBottom: 6,
    };
    const titleStyle = {
        color: 'black',
        textDecoration: 'none',
        flex: 1,
        cursor: 'pointer',
        alignSelf: 'center',
        fontSize: 18, // Update the font size to a smaller value, e.g. 16px
    };

    //Getting notes from backend
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const noteList = useSelector((state) => state.noteList);
    const { loading, error, notes } = noteList;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: successCreate } = noteCreate;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteNoteAction(id));
        }
        navigate("/mynotes");
    };

    useEffect(() => {
        dispatch(listNotes());

        if (!userInfo) {
            navigate('/login')
        }

    }, [dispatch, userInfo, navigate, successCreate, successUpdate, successDelete])


    return (
        <MainScreen title={`Welcome back ${userInfo.name}`}>
            <Link to="/createnote">
                <Button style={customButtonStyles} size="lg">
                    CREATE NEW TODO
                </Button>
            </Link>
            {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading />}
            {notes?.reverse().filter(filteredNote=>(filteredNote.title.toLowerCase().includes(search.toLowerCase()))).map((note) => (
                <Accordion key={note._id}>
                    <Accordion.Item eventKey="0" style={{ margin: 10, border: 'none' }}>
                        <Card style={{ margin: 10 }}>
                            <Card.Header style={{ display: 'flex' }}>
                                <span style={titleStyle}>
                                    <AccordionHeader variant="link" >
                                        {note.title}
                                    </AccordionHeader>
                                </span>

                                <div style={{padding:'10px'}}>
                                    <Link to={`/note/${note._id}`}>
                                        <Button variant='primary'>Edit</Button>
                                    </Link>
                                    <Button variant='danger' className='mx-2' onClick={() => deleteHandler(note._id)}>Delete</Button>
                                </div>
                            </Card.Header>
                            <Accordion.Body>
                                <Card.Body>
                                    <h4>
                                        <Badge pill bg="success" style={{ fontSize: '16px' }}>
                                            Category-{note.category}
                                        </Badge>
                                    </h4>
                                    <blockquote
                                        className="blockquote mb-0"
                                        style={{ fontSize: '18px' }}
                                    >
                                        <ReactMarkdown>{note.content}</ReactMarkdown>
                                        <footer className="blockquote-footer">
                                            Created on{" "}
                                            <cite title="Source Title">
                                                {note.createdAt.substring(0, 10)}
                                            </cite>
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Accordion.Body>
                        </Card>
                    </Accordion.Item>
                </Accordion>
            ))}
        </MainScreen>
    );
};

export default MyNotes;
