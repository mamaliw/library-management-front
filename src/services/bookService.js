import api from './api';

// GET all books with optional query params (search, genre, sort, order, page, etc.)
export async function getBooks(params = {}) {
    const { data } = await api.get('/books', { params });
    return data;
}

// GET single book by ID (requires a new endpoint /books/:id on your backend)
export async function getBookById(bookId) {
    const { data } = await api.get(`/books/${bookId}`);
    return data;
}

// POST add a new book
export async function addBook(bookData) {
    const { data } = await api.post('/books', bookData);
    return data;
}

// PUT update a book (requires a new endpoint /books/:id on your backend)
export async function updateBook(bookId, bookData) {
    const { data } = await api.put(`/books/${bookId}`, bookData);
    return data;
}

// DELETE a book (requires a new endpoint /books/:id on your backend)
export async function deleteBook(bookId) {
    const { data } = await api.delete(`/books/${bookId}`);
    return data;
}

// Borrow a book
export async function borrowBook(bookId) {
    const { data } = await api.post('/books/borrow', { bookId });
    return data;
}

// Return a book
export async function returnBook(bookId) {
    const { data } = await api.post('/books/return', { bookId });
    return data;
}
