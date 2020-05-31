import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

const BooksList = ({ books, handleUpdate }) => {
  return (
    <div className='bookshelf-books'>
      <ol className='books-grid'>
        {books.map(book => {
          return (
            <li key={book.id}>
              <Book bookData={book} handleChange={handleUpdate} />
            </li>
          );
        })}
      </ol>
    </div>
  );
};

BooksList.propTypes = {
  books: PropTypes.array,
  handleUpdate: PropTypes.func
};

export default BooksList;
