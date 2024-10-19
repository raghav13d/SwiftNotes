import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesAction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate,useParams} from "react-router-dom";

function SingleNote() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const params = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const navigate =useNavigate();
    
    const dispatch = useDispatch();

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { loading, error } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete } = noteDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteNoteAction(id));
        }
        navigate("/mynotes");
    };

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`${BASE_URL}/api/notes/${params.id}`);

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        };

        fetching();
    }, [params.id, date]);

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateNoteAction(params.id, title, content, category));
        if (!title || !content || !category) return;

        resetHandler();
        navigate("/mynotes");
    };

    return (
        <MainScreen title="Edit ToDo">
            <Card>
                <Card.Header>Edit your ToDo</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {loadingDelete && <Loading />}
                        {errorDelete && (
                            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                        )}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Enter the title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                className="mb-2"
                                placeholder="Enter the content"
                                rows={4}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        {content && (
                            <Card>
                                <Card.Header >ToDo Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="content">
                            <Form.Label className="mt-2">Category</Form.Label>
                            <Form.Control
                                type="content"
                                placeholder="Enter the Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button className="mt-2" variant="primary" type="submit">
                            Update ToDo
                        </Button>
                        <Button
                            className="mx-2 mt-2"
                            variant="danger"
                            onClick={() => deleteHandler(params.id)}
                        >
                            Delete ToDo
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default SingleNote;