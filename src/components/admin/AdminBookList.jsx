import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../../services/bookService';
import { toast } from 'react-toastify';
import AdminBookForm from './AdminBookForm';

function AdminBookList() {
    const [books, setBooks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        getBooks()
            .then((data) => setBooks(data))
            .catch((err) => {
                // handled by interceptor
            });
    };

    const handleDelete = (bookId) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;

        deleteBook(bookId)
            .then(() => {
                toast.success('Book deleted successfully');
                loadBooks();
            })
            .catch((err) => {
                // handled by interceptor
            });
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setEditingBook(null);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingBook(null);
        loadBooks();
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Manage Books</h4>
                <button className="btn btn-primary" onClick={handleAddNew}>
                    Add New Book
                </button>
            </div>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th style={{ width: '150px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((b) => (
                    <tr key={b.id}>
                        <td>{b.title}</td>
                        <td>{b.author}</td>
                        <td>{b.genre}</td>
                        <td>{b.stock}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEdit(b)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(b.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showForm && (
                <AdminBookForm
                    book={editingBook}
                    onClose={handleFormClose}
                />
            )}
        </div>
    );
}

export default AdminBookList;
