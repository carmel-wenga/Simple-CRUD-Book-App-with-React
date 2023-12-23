import 'bootstrap/dist/css/bootstrap.min.css';
import '../statics/css/addbook.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import React, { useState } from "react";

function AddBook() {
    const [isbn, setIsbn] = useState("");    
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [genres, setGenres] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publish_date, setPublishDate] = useState("");
    const [price, setPrice] = useState(0.0);
    const [pages, setPages] = useState(0)

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            isbn,
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
            const response = await axios.post("http://localhost:5000/api/v1/books/", newBook);
      
            if (response.status === 201) {
              setShowSuccessPopup(true);
            } else {
              console.error("Error creating book:", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        };

    };

    return (
        <div>
        <h2>Add a new Book</h2>
        <form onSubmit={handleSubmit}>
            {showSuccessPopup && (
                <div className="success-popup">
                    <p>Book {isbn} updated successfully! <a href={`/books/${isbn}`}>Click here</a> to view book details. </p>
                    <button onClick={closeSuccessPopup}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            )}
            <div>
                <label htmlFor="isbn">ISBN</label>
                <input type="text" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} required/>
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
                <input type="date" id="publish_date" value={publish_date} onChange={(e) => setPublishDate(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="pages">Pages</label>
                <input type="text" id="pages" value={pages} onChange={(e) => setPages(e.target.value)} required />
            </div>
            <div>
                <input type="submit" value="Add Book" className="btn btn-secondary"/><input type="reset" value="Reset" className="btn btn-light"/>
            </div>
        </form>
        </div>
    );

}

export default AddBook;