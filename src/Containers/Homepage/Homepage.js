import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksList from '../../Components/BooksList/BooksList';

const Homepage = ({ allBooks, handleUpdate }) => {
  const currentlyReadingBooks = allBooks.filter(book => {
    return book.shelf === 'currentlyReading';
  });

  const wantToReadBooks = allBooks.filter(book => {
    return book.shelf === 'wantToRead';
  });

  const readBooks = allBooks.filter(book => {
    return book.shelf === 'read';
  });

  return (
    <>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Currently Reading</h2>
          <BooksList
            books={currentlyReadingBooks}
            handleUpdate={handleUpdate}
          />
        </div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Want To Read</h2>
          <BooksList books={wantToReadBooks} handleUpdate={handleUpdate} />
        </div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Read</h2>
          <BooksList books={readBooks} handleUpdate={handleUpdate} />
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>
          <button>Add a book</button>
        </Link>
      </div>
    </>
  );
};

Homepage.propTypes = {
  allBooks: PropTypes.array,
  handleUpdate: PropTypes.func
};

export default Homepage;
