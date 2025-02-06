import api from './api';

// GET current user profile
export async function getUserProfile() {
    const { data } = await api.get('/users/me');
    return data;
}
