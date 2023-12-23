import 'bootstrap/dist/css/bootstrap.min.css';
import '../statics/css/addbook.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';


function UpdateBook() {

    const { isbn } = useParams();
    const [book, setBook] = useState({});
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [genres, setGenres] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publish_date, setPublishDate] = useState("");
    const [price, setPrice] = useState(0.0);
    const [pages, setPages] = useState(0);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [date, setDate] = useState();

    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    const HandleUpdate = async (e) => {
        e.preventDefault();

        const updatedBook = {
            isbn: e.target.isbn.value,
            title,
            authors,
            description,
            language,
            genres,
            publisher,
            publish_date,
            price,
            pages,
        };

        // Send a POST request to your API to create the book
        try {

            const response = await axios.put(`http://localhost:5000/api/v1/books/${updatedBook.isbn}`, updatedBook);
      
            if (response.status === 200) {
                setShowSuccessPopup(true);
            } else {
                console.error("Error creating book:", response.status);
            }

        } catch (error) {
            console.error("Error:", error);
        };

    };

    useEffect(() =>{
        const apiUrl = `http://localhost:5000/api/v1/books/${isbn}`;
    
        axios.get(apiUrl)
            .then((response) => {
                setBook(response.data);
                setTitle(response.data.title);
                setAuthors(response.data.authors);
                setDescription(response.data.description);
                setLanguage(response.data.language);
                setGenres(response.data.genres);
                setPublisher(response.data.publisher);
                setPrice(response.data.price || 0.0 );
                setPages(response.data.pages || 0);
                setDate((new Date(response.data.publish_date)).toISOString().split('T')[0]);
            })
            .catch((error) => {
                console.error('Error while fetching book data:', error);
            });
      }, [isbn]);

    return (
        <div>
        <h2>Update Book</h2>

        <form onSubmit={HandleUpdate}>
            {showSuccessPopup && (
                <div className="success-popup">
                    <p>Book {book.isbn} updated successfully! <a href={`/books/${book.isbn}`}>Click here</a> to view book details. </p>
                    <button onClick={closeSuccessPopup}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            )}
            <div>
                <label htmlFor='isbn'>ISBN</label>
                <input type="text" id="isbn" name="isbn" value={book.isbn || ''} required readOnly/>
            </div>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="authors">Authors</label>
                <input type="text" id="authors" value={authors} onChange={(e) => setAuthors(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={7}/>
            </div>
            <div>
                <label htmlFor="language">Language</label>
                <input type="text" id="language" value={language} onChange={(e) => setLanguage(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="genres">Genres</label>
                <input type="text" id="genres" value={genres} onChange={(e) => setGenres(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="publisher">Publisher</label>
                <input type="text" id="publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="publish_date">Publish Date</label>
                <input type="date" id="publish_date" value={date} onChange={(e) => setPublishDate(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="pages">Pages</label>
                <input type="number" id="pages" value={pages} onChange={(e) => setPages(e.target.value)} required />
            </div>
            <div>
                <input type="submit" value="Update Book" className="btn btn-secondary"/><input type="reset" value="Reset" className="btn btn-light"/>
            </div>
        </form>

        </div>
    );

}

export default UpdateBook;