import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ bookData, handleChange }) => {
  return (
    <div className='book'>
      <div className='book-top'>
        <div
          className='book-cover'
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${bookData.imageLinks &&
              bookData.imageLinks.thumbnail})`
          }}
        ></div>
        <div className='book-shelf-changer'>
          <select
            value={bookData.shelf ? bookData.shelf : 'none'}
            onChange={event => handleChange(event, bookData)}
          >
            <option value='move' disabled>
              Move to...
            </option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{bookData.title}</div>
      {bookData.authors ? (
        bookData.authors.map((author, index) => {
          return (
            <div key={index} className='book-authors'>
              {author}
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

Book.propTypes = {
  bookData: PropTypes.object,
  handleChange: PropTypes.func
};

export default Book;
