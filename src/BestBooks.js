import React from 'react';

function BestBooks (){

  /* TODO: Make a GET request to your API to fetch all the books from the database  */


    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
export default BestBooks;
