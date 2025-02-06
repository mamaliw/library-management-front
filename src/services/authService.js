import api from './api';

export async function registerUser({ fullName, email, password }) {
    const { data } = await api.post('/auth/register', {
        fullName,
        email,
        password
    });
    return data;
}

export async function loginUser({ email, password }) {
    const { data } = await api.post('/auth/login', {
        email,
        password
    });
    return data; // { token, user: { id, fullName, email, role } }
}
