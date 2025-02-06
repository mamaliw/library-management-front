import React, { useState } from 'react';

function RegisterForm({ onSubmit, loading }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ fullName, email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Full Name</label>
                <input
                    className="form-control"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label>Email</label>
                <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Sign Up'}
            </button>
        </form>
    );
}

export default RegisterForm;
