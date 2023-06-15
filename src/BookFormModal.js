import React from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from "react";

function BooksModal({ onBookSubmit, bookId }) {

    const [show, setShow] = useState(false); // Show/Hide the Modal
    const [status, setStatus] = useState('Pending'); // Book Status 
    const [title, setTitle] = useState(''); // Book Title
    const [description, setDescription] = useState(''); // Book Description
    const { getAccessTokenSilently } = useAuth0();
    // Function handles Modal Show/Hide
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function for book submission
    const handleBookSubmit = async (event) => {
        event.preventDefault();
        const addedBook = { title, description, status };

        try {
            const token = await getAccessTokenSilently({
                audience: 'https://canofbooks/api',
                scope: 'openid profile email'
              });
            // After new book is added, POST request is sent to server
            const response = await axios.post('http://localhost:3001/books/', addedBook, {
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
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Book
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add A New Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleBookSubmit}>
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

export default BooksModal