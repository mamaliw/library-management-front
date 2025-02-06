import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById, borrowBook, returnBook } from '../services/bookService';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'; // <-- adjust the import to match your context location

function BookDetailsPage() {
    const { user } = useAuth(); // <-- Access the currently logged-in user
    const { bookId } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        getBookById(bookId)
            .then((data) => setBook(data))
            .catch(() => {
                toast.error('Could not fetch book details');
            });
    }, [bookId]);

    // Borrow
    const handleBorrow = () => {
        borrowBook(bookId)
            .then(() => {
                toast.success('Book borrowed successfully');
                return getBookById(bookId);
            })
            .then((data) => {
                if (data) setBook(data);
            })
            .catch((err) => {
                // handle error, if needed
            });
    };

    // Return
    const handleReturn = () => {
        returnBook(bookId)
            .then(() => {
                toast.success('Book returned successfully');
                return getBookById(bookId);
            })
            .then((data) => {
                if (data) setBook(data);
            })
            .catch((err) => {
                // handle error, if needed
            });
    };

    if (!book) {
        return <div className="container mt-5">Loading book details...</div>;
    }

    return (
        <div className="container mt-5">
            <h3>{book.title}</h3>
            {book.imageUrl && (
                <img
                    src={book.imageUrl}
                    alt={book.title}
                    style={{ width: '200px', height: 'auto' }}
                />
            )}
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Status:</strong> {(book.status === 'Borrowed' && book.borrowedBy !== user?.email) ? `Borrowed By: ${book.borrowedBy}`: book.status }</p>
            <p><strong>Stock:</strong> {book.stock}</p>

            {/* If book is available, user can borrow */}
            {book.status === 'Available' && (
                <button className="btn btn-primary me-2" onClick={handleBorrow}>
                    Borrow
                </button>
            )}

            {/* If book is borrowed and the borrowedBy matches the current user's email, show Return button */}
            {book.status === 'Borrowed' && book.borrowedBy === user?.email && (
                <button className="btn btn-warning" onClick={handleReturn}>
                    Return
                </button>
            )}
        </div>
    );
}

export default BookDetailsPage;
