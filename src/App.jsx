import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookDetailsPage from './pages/BookDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Navbar from './components/navbar/Navbar';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <ToastContainer />

                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected / Common routes (we’ll do naive protection check in AuthContext or page) */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books/:bookId" element={<BookDetailsPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />

                    {/* Admin route */}
                    <Route path="/admin" element={<AdminDashboardPage />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
