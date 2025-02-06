import React, { useState, useEffect } from 'react';
import { addBook, updateBook } from '../../services/bookService';
import { toast } from 'react-toastify';

function AdminBookForm({ book, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        genre: 'Fiction',
        description: '',
        stock: '1',
        imageUrl: ''
    });

    useEffect(() => {
        if (book) {
            book.stock = book.stock.toString();
            setFormData(book);
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (book) {
            // Update existing
            updateBook(book.id, formData)
                .then(() => {
                    toast.success('Book updated successfully!');
                    onClose();
                })
                .catch(() => {});
        } else {
            // Add new
            addBook(formData)
                .then(() => {
                    toast.success('Book added successfully!');
                    onClose();
                })
                .catch(() => {});
        }
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
                        <h5 className="modal-title">
                            {book ? 'Edit Book' : 'Add New Book'}
                        </h5>
                        <button className="btn-close" onClick={onClose} />
                    </div>
                    <div className="modal-body">
                        {/* Title */}
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Author */}
                        <div className="mb-3">
                            <label className="form-label">Author</label>
                            <input
                                type="text"
                                name="author"
                                className="form-control"
                                value={formData.author}
                                onChange={handleChange}
                            />
                        </div>
                        {/* ISBN */}
                        <div className="mb-3">
                            <label className="form-label">ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                className="form-control"
                                value={formData.isbn}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Genre */}
                        <div className="mb-3">
                            <label className="form-label">Genre</label>
                            <select
                                name="genre"
                                className="form-control"
                                value={formData.genre}
                                onChange={handleChange}
                            >
                                <option>Fiction</option>
                                <option>Non-Fiction</option>
                                <option>Mystery</option>
                                <option>Sci-Fi</option>
                                <option>Biography</option>
                                <option>Self-Help</option>
                                <option>History</option>
                                <option>Fantasy</option>
                                <option>Horror</option>
                            </select>
                        </div>
                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Stock */}
                        <div className="mb-3">
                            <label className="form-label">Stock</label>
                            <input
                                type="string"
                                name="stock"
                                className="form-control"
                                value={formData.stock}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Image URL */}
                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input
                                type="text"
                                name="imageUrl"
                                className="form-control"
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            {book ? 'Update' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminBookForm;
