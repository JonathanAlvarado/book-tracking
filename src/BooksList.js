import React, {Component} from 'react';
import BookShelf from './BookShelf.js';
import {Link} from 'react-router-dom';

class BooksList extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf shelfTitle='Currently Reading' booksList={this.props.currentlyReading}
              onShelfChange={this.props.onShelfChange}/>
            <BookShelf shelfTitle='Want to Read' booksList={this.props.wantToRead} 
              onShelfChange={this.props.onShelfChange}/>
            <BookShelf shelfTitle='Read' booksList={this.props.read} 
              onShelfChange={this.props.onShelfChange}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
export default BooksList