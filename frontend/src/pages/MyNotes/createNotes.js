import React, { useEffect, useState } from "react";
import Common from "../../components/common";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/createNoteActions";
import Loader from '../../components/loadder/loader';
import ErrorMessage from '../../components/error/error';
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

function CreateNote() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const selectedNote = useSelector((state) => state.noteReducer.selectedNote);

    const [title, setTitle] = useState(selectedNote?.title || "");
    const [content, setContent] = useState(selectedNote?.content || "");
    const [category, setCategory] = useState(selectedNote?.category || "");
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, loggedInUser } = userLogin

    useEffect(() => {
        if (!loggedInUser) {
            navigate("/login");
        }
    }, [navigate, loggedInUser]);

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };

    const cancelHandler = () => {
        dispatch({ type: "clearSelectedNote" })
        navigate("/notes");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!title || !content || !category) return;
        dispatch(createNoteAction(id, title, content, category));
        navigate("/notes");
        resetHandler();
    };
    const commonTitle = id ? `Edit Note` : "Create Note";
    const cardHeader = id ? `Edit a Note` : "Create a Note";
    return (
        <Common title={commonTitle}>
            <Card>
                {/* <Card.Header className="font-weight-bolder text-uppercase">{cardHeader}</Card.Header> */}
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="title">
                            <Form.Label className="font-weight-bolder text-uppercase">Title</Form.Label>
                            <Form.Control
                                autoFocus
                                type="title"
                                value={title}
                                placeholder="Enter the title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content" className="mt-2">
                            <Form.Label className="font-weight-bolder text-uppercase">Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={content}
                                placeholder="Enter the content"
                                rows={4}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        {content && (
                            <Card className="mt-2">
                                <Card.Header className="text-uppercase">Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="content">
                            <Form.Label className="mt-2 font-weight-bolder text-uppercase">Category</Form.Label>
                            <Form.Control
                                type="content"
                                value={category}
                                placeholder="Enter the Category"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loader size={50} />}
                        <Button type="submit" variant="primary" className="mt-3">
                            {commonTitle}
                        </Button>
                        <Button className="mx-2 mt-3" onClick={resetHandler} variant="warning">
                            Reset Feilds
                        </Button>
                        <Button className="mt-3" onClick={cancelHandler} variant="danger">
                            Cancel
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </Common>
    );
}

export default CreateNote;