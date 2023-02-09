import axios from "axios";

import baseURL from "../backend.js";

const axiosJWT = axios.create({ withCredentials: true });

axiosJWT.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (err) => {
        if (err.response.status === 401) {
            await axios.get(`${baseURL}users/token-refresh`).catch((rtErr) => {
                return Promise.reject(rtErr);
            });
            return axios(err.config);
        }
        return Promise.reject(err);
    }
);

export { axiosJWT };
