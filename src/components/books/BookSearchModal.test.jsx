// BookSearchModal.test.jsx
import React from 'react';
import {
    render,
    screen,
    fireEvent,
    waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom';
import BookSearchModal from './BookSearchModal';
import { MemoryRouter } from 'react-router-dom';
import { getBooks } from '../../services/bookService';

// 1) Mock the getBooks function so no real API calls occur
jest.mock('../../services/bookService', () => ({
    getBooks: jest.fn(),
}));

describe('BookSearchModal', () => {
    let onCloseMock;

    const renderModal = () => {
        // Wrap in MemoryRouter so that useNavigate works without error
        return render(
            <MemoryRouter>
                <BookSearchModal onClose={onCloseMock} />
            </MemoryRouter>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
        onCloseMock = jest.fn();
    });

    test('renders modal title and a close button', async () => {
        // getBooks will be called once automatically due to the useEffect
        getBooks.mockResolvedValueOnce([]);

        renderModal();

        // Wait for the initial getBooks call to finish
        await waitFor(() => {
            expect(getBooks).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText(/search books/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    test('clicking the Close button calls onClose', async () => {
        getBooks.mockResolvedValueOnce([]);

        renderModal();

        // Wait for initial load
        await waitFor(() => {
            expect(getBooks).toHaveBeenCalledTimes(1);
        });

        // Click Close
        fireEvent.click(screen.getByRole('button', { name: /close/i }));
        expect(onCloseMock).toHaveBeenCalled();
    });

    test('auto-search on mount + subsequent typing calls getBooks with correct params', async () => {
        // We'll set up multiple resolvedValue calls to handle repeated getBooks calls:
        //  - 1st call on mount returns empty array
        //  - 2nd call after typing returns some results
        getBooks
            .mockResolvedValueOnce([]) // for mount
            .mockResolvedValueOnce([]); // for typing

        renderModal();

        // Wait for mount's getBooks
        await waitFor(() => {
            expect(getBooks).toHaveBeenCalledWith({
                search: undefined,
                genre: undefined,
            });
        });

        // Type into the input
        const searchInput = screen.getByPlaceholderText(/search by title or author/i);
        fireEvent.change(searchInput, { target: { value: 'Harry' } });

        // Wait for the second call
        await waitFor(() => {
            // 2 calls total now
            expect(getBooks).toHaveBeenCalledTimes(2);
        });

        // The second call params
        expect(getBooks).toHaveBeenLastCalledWith({
            search: 'Harry',
            genre: undefined,
        });
    });

    test('changing genre triggers getBooks', async () => {
        // 1st for mount, 2nd after genre change
        getBooks
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([
                { id: '1', title: 'Mock Book', author: 'Mock Author', imageUrl: '' },
            ]);

        renderModal();

        // Wait for mount
        await waitFor(() => {
            expect(getBooks).toHaveBeenCalledTimes(1);
        });

        // Change genre
        const genreSelect = screen.getByLabelText(/genre/i);
        fireEvent.change(genreSelect, { target: { value: 'Fiction' } });

        // Wait for second getBooks call
        await waitFor(() => {
            expect(getBooks).toHaveBeenCalledTimes(2);
        });

        // Check last call's params
        expect(getBooks).toHaveBeenLastCalledWith({
            search: undefined,
            genre: 'Fiction',
        });

        // The mock result from the second call
        expect(await screen.findByText(/mock book/i)).toBeInTheDocument();
    });

    test('renders search results and handles book click', async () => {
        // 1st for mount: return array with multiple books
        getBooks.mockResolvedValueOnce([
            { id: '123', title: 'Alpha Book', author: 'Author A', imageUrl: '' },
            { id: '456', title: 'Beta Book', author: 'Author B', imageUrl: '' },
        ]);

        renderModal();

        // Wait for mount call
        const alphaItem = await screen.findByText(/alpha book/i);
        const betaItem = screen.getByText(/beta book/i);
        expect(alphaItem).toBeInTheDocument();
        expect(betaItem).toBeInTheDocument();

        // Click alpha book
        fireEvent.click(alphaItem);

        // handleBookClick calls onClose
        expect(onCloseMock).toHaveBeenCalled();
    });
});
