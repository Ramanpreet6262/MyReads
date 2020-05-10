import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './Containers/Homepage/Homepage';
import * as BooksApi from './BooksAPI';
import './App.css';

const App = () => {
  const [allBooks, setAllBooks] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    BooksApi.getAll()
      .then(res => {
        console.log(res);
        setAllBooks(res);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        alert(`An error occurred while fetching books. Please retry`);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (event, newBook) => {
    const shelf = event.target.value;
    const updatedAllBooks = allBooks.map(book => {
      if (book.id === newBook.id) {
        book.shelf = shelf;
      }
      return book;
    });
    setAllBooks(updatedAllBooks);
    BooksApi.update(newBook, shelf)
      .then(res => {
        alert(`${newBook.title} has been added to ${shelf} successfully!!`);
      })
      .catch(err => {
        console.log(err);
        alert(`An error occured while updating the shelf of ${newBook.title}`);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
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
          {/* <Route path='/search' exact component={} /> */}
          {/* <Route path='*' component={} /> */}
        </Switch>
      </div>
    );
  }
};

export default App;
