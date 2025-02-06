import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function LoginPage() {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            setLoading(true);
            const { token, user } = await loginUser(credentials);
            // Save to context
            login(token, user);
            toast.success('Login successful!');
            // Redirect based on role
            if (user.role === 'Admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            // Error toast is handled by interceptor or we can do here
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <LoginForm onSubmit={handleLogin} loading={loading} />
        </div>
    );
}

export default LoginPage;
