import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/bookService';
import BookList from '../components/books/BookList';
import BookSearchModal from '../components/books/BookSearchModal';
import { toast } from 'react-toastify';

function HomePage() {
    const [books, setBooks] = useState([]);
    const [showSearchModal, setShowSearchModal] = useState(false);

    useEffect(() => {
        // Attempt to fetch the 5 newest
        // If your backend supports ?pageSize=5, you can do that.
        // Otherwise, fetch all and slice(0,5) for demonstration.
        getBooks({ sort: 'createdAt', order: 'desc' })
            .then((data) => {
                const newest = data.slice(0, 5);
                setBooks(newest);
            })
            .catch((error) => {
                toast.error('Failed to load newest books');
            });
    }, []);

    return (
        <div className="container mt-5">

            <h2>Newest Books</h2>
            <BookList books={books}/>
        </div>
    );
}

export default HomePage;
