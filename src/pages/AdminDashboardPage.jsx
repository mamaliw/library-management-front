import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../components/admin/AdminPanel';

function AdminDashboardPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If user is not admin, redirect away
        if (!user || user.role !== 'Admin') {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="container mt-4">
            <h2>Admin Dashboard</h2>
            <AdminPanel />
        </div>
    );
}

export default AdminDashboardPage;
