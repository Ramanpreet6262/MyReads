import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from '../../Components/Book/Book';

const Search = ({
  searchQuery,
  searchedBooks,
  handleUpdate,
  handleSearch,
  clear
}) => {
  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  const errMsg = (
    <div className='notFound'>
      Can't find any book related to {searchQuery}.
      <p className='links' onClick={() => clear()}>
        Clear Search
      </p>
    </div>
  );

  return (
    <>
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        {searchQuery.length !== 0 && searchedBooks.length === 0 ? (
          errMsg
        ) : (
          <div className='search-books-results'>
            <ol className='books-grid'>
              {searchQuery.length !== 0 &&
                searchedBooks.length !== 0 &&
                searchedBooks.map(book => {
                  return (
                    <li key={book.id}>
                      <Book bookData={book} handleChange={handleUpdate} />
                    </li>
                  );
                })}
            </ol>
          </div>
        )}
      </div>
    </>
  );
};

Search.propTypes = {
  searchQuery: PropTypes.string,
  searchedBooks: PropTypes.array,
  handleUpdate: PropTypes.func,
  handleSearch: PropTypes.func,
  clear: PropTypes.func
};

export default Search;
