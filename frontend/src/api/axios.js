import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://doc-gen-i2x3.onrender.com/api/', // Your backend URL
    timeout: 10000, // Optional: timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;
