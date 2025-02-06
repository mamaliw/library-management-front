import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import BookList from './BookList';

describe('BookList Component', () => {
    test('displays "No books found" when books list is empty', () => {
        render(
            <MemoryRouter>
                <BookList books={[]} />
            </MemoryRouter>
        );

        expect(screen.getByText(/no books found/i)).toBeInTheDocument();
    });

    test('renders books correctly with title, author, and genre', () => {
        const mockBooks = [
            {
                id: '1',
                title: 'Test Book 1',
                author: 'Author 1',
                genre: 'Fiction',
                imageUrl: 'https://picsum.photos/200/300',
            },
            {
                id: '2',
                title: 'Test Book 2',
                author: 'Author 2',
                genre: 'Sci-Fi',
                imageUrl: '',
            },
        ];

        render(
            <MemoryRouter>
                <BookList books={mockBooks} />
            </MemoryRouter>
        );

        // Ensure book titles appear
        expect(screen.getByText('Test Book 1')).toBeInTheDocument();
        expect(screen.getByText('Test Book 2')).toBeInTheDocument();

        // Ensure book authors and genres appear
        expect(screen.getByText(/author: author 1/i)).toBeInTheDocument();
        expect(screen.getByText(/author: author 2/i)).toBeInTheDocument();
        expect(screen.getByText(/genre: fiction/i)).toBeInTheDocument();
        expect(screen.getByText(/genre: sci-fi/i)).toBeInTheDocument();
    });

    test('renders book images when available', () => {
        const mockBooks = [
            {
                id: '1',
                title: 'Test Book 1',
                author: 'Author 1',
                genre: 'Fiction',
                imageUrl: 'https://picsum.photos/200/300',
            },
        ];

        render(
            <MemoryRouter>
                <BookList books={mockBooks} />
            </MemoryRouter>
        );

        // Image should be displayed
        const bookImage = screen.getByRole('img', { name: /test book 1/i });
        expect(bookImage).toBeInTheDocument();
        expect(bookImage).toHaveAttribute('src', 'https://picsum.photos/200/300');
    });

    test('renders book details link correctly', () => {
        const mockBooks = [
            {
                id: '1',
                title: 'Test Book 1',
                author: 'Author 1',
                genre: 'Fiction',
                imageUrl: 'https://picsum.photos/200/300',
            },
        ];

        render(
            <MemoryRouter>
                <BookList books={mockBooks} />
            </MemoryRouter>
        );

        const detailsLink = screen.getByRole('link', { name: /details/i });
        expect(detailsLink).toBeInTheDocument();
        expect(detailsLink).toHaveAttribute('href', '/books/1');
    });
});
