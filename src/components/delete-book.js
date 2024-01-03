import 'bootstrap/dist/css/bootstrap.min.css';
import '../statics/css/addbook.css'

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useEffect, useState } from 'react';

import { API_BASE_URL, API_ENDPOINTS } from "../api-config";

import { useParams } from 'react-router-dom';


function DeleteBook() {

    const { isbn } = useParams();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    const closeErrorPopup = () => {
        setShowErrorPopup(false);
    };

    const handleDelete = useCallback(async () => {
      try {
          const response = await axios.delete(
            `${API_BASE_URL}${API_ENDPOINTS.books}${isbn}`
          );
    
          if (response.status === 204) {  
            setShowSuccessPopup(true);
          } else {
            setShowErrorPopup(true);
          }
        } catch (error) {
          setShowErrorPopup(true);
          console.error('Error deleting book');
        }
    },[isbn]);

    useEffect(() => { 
      handleDelete();
    },[handleDelete]);

    return (
        <div>

            {showSuccessPopup && (
                <div className="success-popup">
                    <p>Book {isbn} deleted successfully! <a href={`/books`}>Click here</a> to go back to the list of books. </p>
                    <button onClick={closeSuccessPopup}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            )}

            {showErrorPopup && (
                <div className="error-popup">
                    <p>An error occured while deleting book {isbn}.
                      <a href={`/books`}>Click here</a> to go back to the list of books. 
                    </p>
                    <button onClick={closeErrorPopup}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            )}

        </div>
    );

}

export default DeleteBook;