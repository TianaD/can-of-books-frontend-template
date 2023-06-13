import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import EditBookModal from './EditBookModal';
import { useAuth0 } from '@auth0/auth0-react';


function BestBooks() {
  const [books, setBooks] = useState([]);
  const { getAccessTokenSilently } = useAuth0();



  const useEffect = async () => {
    if (books.length === 0) {
      /* TODO: Make a GET request to your API to fetch all the books from the database  */
      const token = await getAccessTokenSilently();

      let response = axios.get('https://canobooks.onrender.com/books', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      response.then((res) => {
        console.log(res.data)
        // holds returned array of books in useState variable: books
        setBooks(res.data)
      })
      console.log(response)
    }

  }

  
  useEffect(() => {
    fetchBooks();
  }, [])

  
  // let handleBookEdit = async () => {

  // }


  // Function to fetch books from the server
  const fetchBooks = async () => {

    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      // Make a GET request to the /books endpoint
      const response = await axios.get('https://canobooks.onrender.com/books', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data)
      setBooks(response.data);
    }
    // TODO: Be sure your front end will handle any errors, in case something goes wrong.
    catch (error) {
      console.log(error);
    }

  };

  // TODO: use Axios to send a POST request to /book's endpoint ; the server should respond with the new book that was successfully saved : then, pass BestBooks component, save to state to allow React to re-render list of all books
  let handleBookSubmit = async (book) => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'https://canobooks.onrender.com/api',
        scope: 'openid profile email'
      });
      // POST request to the /books endpoint
      const response = await axios.post('https://canobooks.onrender.com/books', book, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // call fetchBooks() to update books list after delete
        fetchBooks();

      }
    }
    // TODO: Be sure your front end will handle any errors, in case something goes wrong.
    catch (error) {
      console.log(error);
    }
  };

  const handleBookUpdate = async (updatedBook, bookId) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.put(`https://canobooks.onrender.com/books/${bookId}`, updatedBook, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        fetchBooks();
      }
    }
    // TODO: Be sure your front end will handle any errors, in case something goes wrong.
    catch (error) {
      console.log(error);
    }
  };

  const handleBookDelete = async (bookId) => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'https://canobooks.onrender.com/api',
        scope: 'openid profile email'
      });
      // Making the DELETE request to the server
      await axios.delete(`https://canobooks.onrender.com/books/${bookId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(books)
      // If the delete is successful, call `fetchBooks` again to get the updated list
      fetchBooks();

    }
    // TODO: Be sure your front end will handle any errors, in case something goes wrong.
    catch (error) {
      console.log(error);
    }
  };

  let booksHTML = books.map(function (element) {
    return (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-photo/abstract-uv-ultraviolet-light-composition_23-2149243965.jpg?w=826&t=st=1686069372~exp=1686069972~hmac=afc30a6de9c41fa39d2a8911f2442e18a93f5b719f23b067e3125e240ad5fb9b"
          alt="Slide"
        />
        <Carousel.Caption>
          {element.title}
          <Button variant="danger" onClick={() => handleBookDelete(element._id)}>Delete</Button>

        </Carousel.Caption>

      </Carousel.Item>
    )
  })
  if (books.length === 0) {
    booksHTML = (
      <Carousel.Item>
        <Carousel.Caption>
          <h1>{books.title}</h1>
          <p>{books.description}</p>

          {/* <Button variant="secondary" onClick={() => handleBookEdit(books._id)}>Edit</Button> */}

          <Button variant="danger" onClick={() => handleBookDelete(books._id)}>Delete</Button>
          <EditBookModal book={books} onBookUpdate={handleBookUpdate} bookId={books._id} />

        </Carousel.Caption>
      </Carousel.Item>)
  }

  return (
    <>
      <h2>Personal Bookshelf</h2>

      {/* {books.length ? (
        <p>Book Carousel coming soon</p>
      ) : (
        <h3>No Books Found :(</h3>
      )} */}
      <BookFormModal onBookSubmit={handleBookSubmit} style={{}} />

      <Carousel>

        {booksHTML}

      </Carousel>

      {/* {Button} */}

    </>



  )
}
export default BestBooks;
