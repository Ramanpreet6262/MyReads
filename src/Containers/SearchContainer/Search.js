import React from 'react';
import { Link } from 'react-router-dom';

const Search = ({ allBooks, searchQuery }) => {
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
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'></ol>
        </div>
      </div>
    </>
  );
};

export default Search;
