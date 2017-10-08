import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BooksList from './BooksList';
import SearchBook from './SearchBook';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {

  state = {
    myReads: [],
    searchedBooks: [],
  }

  // Add books to the state. My reads
  componentDidMount() {
    BooksAPI.getAll().then(myReads => {
        this.setState({myReads})
    })
  }

  onShelfChange = (book, shelf) => {
    if (this.state.myReads) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        const movedBooks = this.state.myReads.filter(b => b.id !== book.id)
        movedBooks.push(book);
        this.setState({ myReads: movedBooks })
      })
    }
  };

  render() {
    const currentlyReading = this.state.myReads.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead = this.state.myReads.filter((book) => book.shelf === 'wantToRead')
    const read = this.state.myReads.filter((book) => book.shelf === 'read')

    return (
      <Router>
      <div className="app">
          <Route exact path="/" render={() => (
              <BooksList
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
                onShelfChange={this.onShelfChange}
              />
          )} />

          <Route exact path="/search" render={({history}) => (
            <SearchBook
                onShelfChange={this.onShelfChange}
                history={history}
                books={currentlyReading.concat(wantToRead, read)}
            />
          )}/>
      </div>
      </Router>
    );
  }
}

export default BooksApp