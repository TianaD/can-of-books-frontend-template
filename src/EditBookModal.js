import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

//book prop -- book obj to be updated, nookUpdate --function called when the book is to be updated
export default function EditBookModal({ book, onBookUpdate, openBookModal, setOpenBookModal, onBookSubmit }) {
    const [show, setShow] = useState(false); // For toggling the Modal
    const [title, setTitle] = useState(book.title); //To hold the title of the book
    const [description, setDescription] = useState(book.description); // To hold the description of the book
    const [status, setStatus] = useState(book.status); // To hold the status of the book
    const { getAccessTokenSilently } = useAuth0();


    //updates the modal display
    const handleClose = () => setOpenBookModal(false);
    const handleShow = () => setOpenBookModal(true);
    console.log(openBookModal)

    //after form is submitted, handleBookUpdate function runs
    const handleBookUpdate = async (event) => {

        event.preventDefault();
        let onBookUpdate = { title, description, status };

        try {
            const token = await getAccessTokenSilently({
                audience: 'https://canofbooks/api',
                scope: 'openid profile email'
            });
            // After new book is added, POST request is sent to server
            const response = await axios.put('http://localhost:3001/books/', onBookUpdate, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onBookSubmit(response.data);

            setTitle(''); // Resets the title state
            setDescription(''); // Resets the description state
            setStatus('Pending'); // Resets the status state
            handleClose(); // Closes Modal
        } catch (error) {
            console.log(error);
        }


        // creates a new book object with the updated title, description, and status
        const updatedBook = { title, description, status };
        // calls the bookUpdate function, passing it the new book object and the id of the book we want to update.
        onBookUpdate = (updatedBook, book._id);
        //closes modal
        handleClose();
    }
    useEffect(() => {
        setTitle(book.title);
        setDescription(book.description);
        setStatus(book.status);
    }, [book]);


    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                Edit Book
            </Button>

            <Modal show={openBookModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit A Book!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* onSubmit is set to handleBookUpdate, so when the user submits the form, the handleBookUpdate function is called. */}
                    <Form onSubmit={handleBookUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status:</Form.Label>
                            <Form.Select
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <option value="Plan to Read">Plan to Read</option>
                                <option value="Currently Reading">Currently Reading</option>
                                <option value="Read">Read</option>
                                <option value="Pending">Pending</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}