import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { registerUser } from '../services/authService';
import { toast } from 'react-toastify';

function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        try {
            setLoading(true);
            await registerUser(formData);
            toast.success('User registered successfully!');
            // After success, navigate to login
            navigate('/login');
        } catch (error) {
            // Error toast is handled or we can do it explicitly
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Sign Up</h2>
            <RegisterForm onSubmit={handleRegister} loading={loading} />
        </div>
    );
}

export default RegisterPage;
