import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todos-app-cd06a-default-rtdb.firebaseio.com/'
});

export default instance;