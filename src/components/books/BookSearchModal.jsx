import React, { useState, useEffect } from 'react';
import { getBooks } from '../../services/bookService';
import { useNavigate } from 'react-router-dom';

function BookSearchModal({ onClose }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');  // If you're no longer using 'author', you can remove it
    const [genre, setGenre] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            // Combine title and author if you need both. Otherwise remove "author" if it's unused.
            const search = title || author;
            // For empty strings, use `undefined` so your backend doesn't get empty param queries.
            const data = await getBooks({
                search: search === '' ? undefined : search,
                genre: genre === '' ? undefined : genre
            });
            setResults(data);
        } catch (error) {
            // Interceptor or catch block can handle errors
        }
    };

    // Automatically re-run the search whenever title, author, or genre changes
    useEffect(() => {
        handleSearch();
    }, [title, author, genre]);

    const handleBookClick = (bookId) => {
        onClose();
        navigate(`/books/${bookId}`);
    };

    return (
        <div
            className="modal show d-block"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex="-1"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Search Books</h5>
                        <button className="btn-close" onClick={onClose} />
                    </div>
                    <div className="modal-body">
                        {/* Title or Author */}
                        <div className="mb-3">
                            <label className="form-label">Title or Author</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title or author..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Genre */}
                        <div className="mb-3">
                            <label htmlFor="search-genre" className="form-label">Genre</label>
                            <select
                                id="search-genre"
                                className="form-select"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            >
                                <option value="">All Genres</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Biography">Biography</option>
                                <option value="Self-Help">Self-Help</option>
                                <option value="History">History</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Horror">Horror</option>
                            </select>
                        </div>

                        {/* Search Results */}
                        <ul className="list-group">
                            {results.map((book) => (
                                <li
                                    key={book.id}
                                    className="list-group-item d-flex align-items-center"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleBookClick(book.id)}
                                >
                                    {/* Tiny picture */}
                                    {book.imageUrl && (
                                        <img
                                            src={book.imageUrl}
                                            alt={book.title}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                objectFit: 'cover',
                                                marginRight: '10px',
                                            }}
                                        />
                                    )}
                                    <div>
                                        <strong>{book.title}</strong> by {book.author}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookSearchModal;
