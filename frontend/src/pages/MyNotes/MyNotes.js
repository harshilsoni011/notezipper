import { Button, Card, Accordion, Badge, FormControl, Form, Nav } from "react-bootstrap";
import Common from "../../components/common";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdOutlineAddCard } from "react-icons/md";

const MyNotes = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state?.userLogin?.loggedInUser)

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false);
    const [filteredNotes, setFilteredNotes] = useState([])

    useEffect(() => {
        if (!loggedInUser) {
            navigate("/login");
        }
        fetchNotes()
    }, [navigate, loggedInUser]);

    const deleteHandler = (id) => {
        axios.put(`/delete-note/${id}`).then((res) => {
            fetchNotes();
        }).catch((error) => {
            setError(error?.response?.data?.message)
            showErrorAlert('Error Fetching Notes', error?.response?.data?.message);
        })
    };

    const editHandler = (note) => {
        dispatch({ type: 'SET_SELECTED_NOTE', payload: note });
        navigate(`/edit-note/${note._id}`);
    };

    const [notes, setNotes] = useState([]);
    const token = document.cookie.split("token=").at(1)

    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    const [error, setError] = useState('')
    const fetchNotes = async () => {
        await axios.get('/notes').then((res) => {
            setNotes(res?.data?.data)
            setFilteredNotes(res?.data?.data)
            setLoading(false)
        }).catch((error) => {
            console.log("🚀 ~ file: MyNotes.js:49 ~ awaitaxios.get ~ error:", error)
            setError(error?.response?.data?.message)
            showErrorAlert('Error Fetching Notes', error?.response?.data?.message);
        })
    }

    const showErrorAlert = (title, text) => {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
        });
    }

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm)

        // filter the items using the apiUsers state
        const filteredItems = notes.filter((user) =>
            user.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNotes(filteredItems);
    }

    const showConfirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete a Note!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.isConfirmed) {
                deleteHandler(id);
            }
        })
    }

    // const filteredNotes = notes.filter((note) => {
    //     return note?.title?.toLowerCase().includes(props?.searchValue?.toLowerCase())
    //         || note?.content?.toLowerCase().includes(props?.searchValue?.toLowerCase())
    //         || note?.category?.toLowerCase().includes(props?.searchValue?.toLowerCase())
    // });

    return <Common title={`Hello ${loggedInUser?.name}`}>
        {error && (
            <div className="alert alert-danger mt-3">
                {error}
            </div>
        )}

        <Nav className='m-2'>
            <Form>
                <FormControl
                    value={search}
                    type="text"
                    placeholder='Search..'
                    className='mr-sm-2'
                    // onChange={(e) => {
                    //     e.preventDefault()
                    //     setSearch(e.target.value)
                    // }}
                    onChange={handleInputChange}
                />
            </Form>
            <Link to="/create-note">
                <Button style={{ marginLeft: 10, marginBottom: 6, justifyContent: "end" }} size="md">
                    Create new Note
                </Button>
            </Link>
        </Nav>


        {filteredNotes.length > 0 ? filteredNotes.map(note => (
            <Accordion key={note._id}>
                <Card key={note._id} style={{ margin: 10 }}>
                    <Card.Header style={{ display: "flex" }}>
                        <span
                            style={{
                                color: "black",
                                textDecoration: "none",
                                flex: 1,
                                cursor: "pointer",
                                alignSelf: "center",
                                fontSize: 18,
                            }}>
                            <Accordion.Button as={Card.Text} variant="link" eventKey="0">
                                {note.title}
                            </Accordion.Button>
                        </span>
                        <div>
                            <Button onClick={() => editHandler(note)}>
                                Edit
                            </Button>
                            <Button variant="danger" className="mx-2" onClick={() => showConfirmDelete(note._id)}>
                                Delete
                            </Button>
                        </div>
                    </Card.Header>
                    <Accordion.Body eventKey="0">
                        <Card.Body>
                            <h5>
                                <Badge bg="success" className="text-white">
                                    Category - {note.category}
                                </Badge>
                            </h5>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    {note.content}
                                </p>
                                <footer className="blockquote-footer">
                                    Created On - {new Date(note.createdOn).toLocaleDateString()}
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Accordion.Body>
                </Card>
            </Accordion>
        )) :
            <Card.Body>
                <h5> Opps! No Record Found</h5>
            </Card.Body>
        }



    </Common >
}

export default MyNotes;