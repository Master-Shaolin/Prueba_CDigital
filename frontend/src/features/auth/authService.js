import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/auth/login';

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
} 

// Logout user
const logout = async () => {
    localStorage.removeItem('user');
}

const authService = {
    login,
    logout
}

export default authService;