import axios from "axios";

//const GH_TOKEN = process.env.REACT_APP_GH_TOKEN

const GH_TOKEN = import.meta.env.VITE_APP_GH_TOKEN

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers:{
        Authorization: `Bearer ${GH_TOKEN}`
    }
});