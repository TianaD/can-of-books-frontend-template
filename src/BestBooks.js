import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';

function BestBooks() {
  const [books, setBooks] = useState([]);

  useEffect(function () {
    if (books.length === 0) {
      /* TODO: Make a GET request to your API to fetch all the books from the database  */
      let response = axios.get('https://canobooks.onrender.com/books')
      response.then((res) => {
        console.log(res.data)
        // storing returned array of books in useState variable: books
        setBooks(res.data)
      })
      console.log(response)
    }

  })
  let booksHTML = books.map(function (element) {
    return (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1887da7b565%20text%20%7B%20fill%3A%23ffffff%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1887da7b565%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9140625%22%20y%3D%22217.7%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
          alt="First slide"
        />
        <Carousel.Caption>
          {element.title}
        </Carousel.Caption>
      </Carousel.Item>
    )
  })
  if (books.length === 0) {
    booksHTML = (
      <Carousel.Item>
        <Carousel.Caption>
          <h2>Error: No Books Found</h2>
        </Carousel.Caption>
      </Carousel.Item>)
  }

  /* TODO: render all the books in a Carousel */

  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

      {books.length ? (
        <p>Book Carousel coming soon</p>
      ) : (
        <h3>No Books Found :(</h3>
      )}
      <Carousel>

        {booksHTML}

      </Carousel>

    </>
  )
}
export default BestBooks;
