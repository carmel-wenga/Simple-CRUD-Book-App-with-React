import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


import axios from 'axios';
import '../statics/css/list.css'

import { API_BASE_URL, API_ENDPOINTS } from "../api-config";

function BookList() {

    const [books, setBooks] = useState([]);
    const [numberResults, setNumberResults] = useState(0);


    useEffect(() =>{
        const apiUrl = `${API_BASE_URL}${API_ENDPOINTS.books}`;
        console.log('Requesting URL:', apiUrl);
        axios.get(apiUrl)
            .then((response) => {
                setBooks(response.data.books);
                setNumberResults(response.data.number_results);
            })
            .catch((error) => {
                console.error('Error while getting the list of Books:', error);
            });
      }, []);
	


    return (
        <div className='list'>
            <div className='nb-results'>Number of results: {numberResults}</div>

            <ul>
                <li className='title'>
                    <span>ISBN</span>
                    <span>Title</span>
                    <span>Authors</span>
                    <span>Publish Date</span>
                    <span>Actions</span>
                </li>
                { books.map((book, i) => {
                        return <li className='item' key={book.book_id}>
                            <span><a href={`/books/${book.isbn}`}>{book.isbn}</a></span>
                            <span>{book.title}</span>
                            <span>{Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}</span>
                            <span>{book.publish_date}</span>
                            <span>
                                <a href={`/books/${book.isbn}`} title='View more details'><FontAwesomeIcon icon={faEye} color='green'/></a>
                                <a href={`/books/update/${book.isbn}`} title='Update book'><FontAwesomeIcon icon={faEdit} color='blue'/></a>
                                <a href={`/books/delete/${book.isbn}`} title='Delete book'><FontAwesomeIcon icon={faTrash} color='red'/></a>
                            </span>
                        </li>
                    })
                }
            </ul>
        </div>
    );
    
}

export default BookList;
