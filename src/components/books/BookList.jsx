import React from 'react';
import { Link } from 'react-router-dom';

function BookList({ books }) {
    if (!books || books.length === 0) {
        return <p>No books found.</p>;
    }

    return (
        <div className="row">
            {books.map((book) => (
                <div className="col-md-4 mb-3" key={book.id}>
                    <div className="card">
                        {book.imageUrl && (
                            <img
                                src={book.imageUrl}
                                className="card-img-top"
                                alt={book.title}
                                style={{ maxHeight: '200px', objectFit: 'cover' }}
                            />
                        )}
                        <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <p className="card-text">Author: {book.author}</p>
                            <p className="card-text">Genre: {book.genre}</p>
                            <Link to={`/books/${book.id}`} className="btn btn-primary">
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookList;
