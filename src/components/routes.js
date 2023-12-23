
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Book from './get-book';
import BookList from './list-books';
import AddBook from './add-book';
import UpdateBook from './update-book';
import DeleteBook from './delete-book';

function LibRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/books"  element={<BookList />} />
        <Route path="/books/:isbn"  element={<Book />} />
        <Route path="/books/add"  element={<AddBook />} />
        <Route path="/books/update/:isbn"  element={<UpdateBook />} />
        <Route path="/books/delete/:isbn"  element={<DeleteBook />} />        
      </Routes>
    </Router>
  );
}

export default LibRoutes;