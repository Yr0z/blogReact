import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://blog-react-931fd-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default instance;
