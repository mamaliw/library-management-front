
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BookSearchModal from '../books/BookSearchModal';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [showSearchModal, setShowSearchModal] = useState(false);

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <Link className="navbar-brand" to="/">Library App</Link>
            {location.pathname === '/' && (
                <li className="nav-item me-3">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowSearchModal(true)}
                    >
                        Search Books
                    </button>
                </li>
            )}

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">

                    {user ? (
                        <>
                            {/* If Admin, show link to Admin Dashboard */}
                            {user.role === 'Admin' && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">Admin Panel</Link>
                                </li>
                            )}
                            {/* User Info & Logout */}
                            <li className="nav-item dropdown">
                <span
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: 'pointer' }}
                >
                  <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="avatar"
                      style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                  />
                  <span className="ms-2">{user.fullName}</span>
                </span>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button className="dropdown-item" onClick={handleProfileClick}>
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Conditionally render the BookSearchModal if showSearchModal is true */}
            {showSearchModal && (
                <BookSearchModal onClose={() => setShowSearchModal(false)} />
            )}
        </nav>
    );
}

export default Navbar;

