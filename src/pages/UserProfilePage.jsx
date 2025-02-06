import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/userService';
import { returnBook } from '../services/bookService';
import { toast } from 'react-toastify';

function UserProfilePage() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        getUserProfile()
            .then((data) => setProfile(data))
            .catch(() => {
                toast.error('Failed to fetch user profile');
            });
    };

    const handleReturnBook = async (bookId) => {
        try {
            await returnBook(bookId);
            toast.success('Book returned successfully');
            // Refresh profile to update borrowedBooks
            loadProfile();
        } catch (error) {
            // Interceptor or fallback
        }
    };

    if (!profile) {
        return <div className="container mt-5">Loading profile...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>User Profile</h2>
            <p><strong>Full Name:</strong> {profile.fullName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>

            <h4 className="mt-2">Borrowed Books:</h4>
            {profile.borrowedBooks && profile.borrowedBooks.length > 0 ? (
                <ul className="list-group">
                    {profile.borrowedBooks.map((b) => (
                        <li key={b.id} className="list-group-item d-flex align-items-center justify-content-between">
                            <div>
                                <strong>{b.title}</strong>
                            </div>
                            {(
                                <button className="btn btn-warning btn-sm" onClick={() => handleReturnBook(b.id)}>
                                    Return
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have not borrowed any books.</p>
            )}
        </div>
    );
}

export default UserProfilePage;
