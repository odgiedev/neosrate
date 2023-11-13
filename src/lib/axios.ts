import axios from "Axios";

export const Axios = axios.create({
    baseURL: 'http://localhost:8080/api',
    // timeout: 1000,
    // headers: {'': ''}
});