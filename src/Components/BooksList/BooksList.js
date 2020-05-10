import React from 'react';
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

export default BooksList;
