import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';
import { getBooks } from '../services/bookService';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';

// 1) Mock getBooks function from bookService
jest.mock('../services/bookService', () => ({
    getBooks: jest.fn(),
}));

// 2) Mock toast notifications
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

describe('HomePage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mock calls before each test
    });

    test('calls getBooks on mount and displays newest books', async () => {
        // Mock API response with 5 newest books
        getBooks.mockResolvedValue([
            { id: '1', title: 'Book One', author: 'Author One', createdAt: '2025-02-01' },
            { id: '2', title: 'Book Two', author: 'Author Two', createdAt: '2025-01-28' },
            { id: '3', title: 'Book Three', author: 'Author Three', createdAt: '2025-01-25' },
            { id: '4', title: 'Book Four', author: 'Author Four', createdAt: '2025-01-20' },
            { id: '5', title: 'Book Five', author: 'Author Five', createdAt: '2025-01-15' },
        ]);

        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        // Ensure getBooks was called once with correct sorting
        await waitFor(() => {
            expect(getBooks).toHaveBeenCalledTimes(1);
            expect(getBooks).toHaveBeenCalledWith({ sort: 'createdAt', order: 'desc' });
        });

        // Ensure books appear on the screen
        expect(await screen.findByText(/book one/i)).toBeInTheDocument();
        expect(screen.getByText(/book two/i)).toBeInTheDocument();
        expect(screen.getByText(/book three/i)).toBeInTheDocument();
        expect(screen.getByText(/book four/i)).toBeInTheDocument();
        expect(screen.getByText(/book five/i)).toBeInTheDocument();
    });

    test('shows error message when getBooks fails', async () => {
        getBooks.mockRejectedValue(new Error('API error'));

        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        // Wait for API call and expect toast.error to be called
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Failed to load newest books');
        });

        // No books should be displayed
        expect(screen.queryByText(/book one/i)).not.toBeInTheDocument();
    });
});
