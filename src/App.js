import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import NProgress from 'nprogress';
import Homepage from './Containers/Homepage/Homepage';
import Search from './Containers/SearchContainer/Search';
import * as BooksApi from './BooksAPI';
import Loader from './Components/Loader/Loader';
import 'nprogress/nprogress.css';
import './App.css';

const App = () => {
  const [allBooks, setAllBooks] = useState();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    NProgress.start();
    BooksApi.getAll()
      .then(res => {
        // console.log(res);
        setAllBooks(res);
        setLoading(false);
        NProgress.done();
      })
      .catch(err => {
        // console.log(err);
        alert(`An error occurred while fetching books. Please retry`);
        setLoading(false);
        NProgress.done();
      });
  }, []);

  const handleUpdate = (event, newBook) => {
    const shelf = event.target.value;
    NProgress.start();
    const updatedAllBooks = allBooks.map(book => {
      if (book.id === newBook.id) {
        book.shelf = shelf;
      }
      return book;
    });
    setAllBooks(updatedAllBooks);
    BooksApi.update(newBook, shelf)
      .then(res => {
        NProgress.done();
        alert(`${newBook.title} has been added to ${shelf} successfully!!`);
      })
      .catch(err => {
        // console.log(err);
        NProgress.done();
        alert(`An error occured while updating the shelf of ${newBook.title}`);
      });
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
              <Search allBooks={allBooks} searchQuery={searchQuery} />
            )}
          />
          {/* <Route path='*' component={} /> */}
        </Switch>
      </div>
    );
  }
};

export default App;
