import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import NProgress from 'nprogress';
import Homepage from './Containers/Homepage/Homepage';
import Search from './Containers/SearchContainer/Search';
import Error404 from './Components/Error404/Error404';
import * as BooksApi from './BooksAPI';
import Loader from './Components/Loader/Loader';
import 'nprogress/nprogress.css';
import './App.css';

const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    NProgress.start();
    BooksApi.getAll()
      .then(res => {
        setAllBooks(res);
        setLoading(false);
        NProgress.done();
      })
      .catch(err => {
        alert(`An error occurred while fetching books. Please retry`);
        setLoading(false);
        NProgress.done();
      });
  }, []);

  const handleUpdate = (event, newBook) => {
    const shelf = event.target.value;
    NProgress.start();
    const newUpdatedBook = newBook;
    newUpdatedBook.shelf = shelf;
    const updatedAllBooks = allBooks
      .filter(book => {
        return book.id !== newBook.id;
      })
      .concat(newUpdatedBook);
    setAllBooks(updatedAllBooks);
    BooksApi.update(newBook, shelf)
      .then(res => {
        NProgress.done();
        alert(`${newBook.title} has been added to ${shelf} successfully!!`);
      })
      .catch(err => {
        NProgress.done();
        alert(`An error occured while updating the shelf of ${newBook.title}`);
      });
  };

  const handleSearch = event => {
    let query = event.target.value;
    if (query === '' && searchQuery) {
      setSearchedBooks([]);
      setSearchQuery('');
    } else if (query === '') {
      setSearchQuery('');
      setSearchedBooks([]);
    } else {
      setSearchQuery(query);
      BooksApi.search(query, 20)
        .then(res => {
          const filteredBooks = res.filter(book => book.imageLinks);
          let updatedResp = filteredBooks.map(book => {
            let sameBook = allBooks.find(item => item.id === book.id);
            if (sameBook) {
              book.shelf = sameBook.shelf;
            }
            return book;
          });
          setSearchedBooks(updatedResp);
        })
        .catch(err => {
          console.log(
            `Sorry!, an error occured while searching. Please retry!!`
          );
          setSearchedBooks([]);
        });
    }
  };

  const clearSearchedBooks = () => {
    setSearchedBooks([]);
    setSearchQuery('');
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className='app'>
        <Switch>
          <Route
            path='/'
            exact
            render={() => (
              <Homepage allBooks={allBooks} handleUpdate={handleUpdate} />
            )}
          />
          <Route
            path='/search'
            exact
            render={() => (
              <Search
                searchQuery={searchQuery}
                searchedBooks={searchedBooks}
                handleUpdate={handleUpdate}
                handleSearch={handleSearch}
                clear={clearSearchedBooks}
              />
            )}
          />
          <Route path='*' component={Error404} />
        </Switch>
      </div>
    );
  }
};

export default App;
