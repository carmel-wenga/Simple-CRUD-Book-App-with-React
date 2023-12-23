import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import '../statics/css/bookdetails.css'

function Book() {
    const { isbn } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const apiUrl = `http://localhost:5000/api/v1/books/${isbn}`;
        axios.get(apiUrl).then((response) => {
                setBook(response.data);
        }).catch((error) => {
            console.error('Error while fetching book data:', error);
        })
    }, [isbn] );


  return (
    <div>
        {book?(
            <div className='content'>                
                <div className='left-side'>
                    <span><b>ID: </b>{book.book_id}</span>
                    <span><b>ISBN: </b>{book.isbn}</span>
                    <span><b>Author: </b>{book.authors}</span>
                    <span><b>Publisher: </b>{book.publisher}</span>
                    <span><b>Publish date:</b> {book.publish_date}</span>
                    <span><b>Language:</b> {book.language}</span>
                    <span><b>genres: </b>{book.genres}</span>
                    <span><b>Price: </b>{book.price}</span>
                    <span><b>Pages: </b>{book.pages}</span>  
                    <span>Actions: 
                        <a href={`/books/update/${book.isbn}`} title='Update this book'><FontAwesomeIcon icon={faEdit} color='blue'/></a>
                        <a href={`/books/delete/${book.isbn}`} title='Delete this book'><FontAwesomeIcon icon={faTrash} color='red'/></a>
                    </span>      
                </div>
                <div className='rigth-side'>
                    <h2 className='book-title'>{book.title}</h2>
                    <p>{book.description}</p>
                </div>
            </div>
        ): (
            <p>Loading ...</p>
        )}
      
    </div>
  );
}

export default Book;