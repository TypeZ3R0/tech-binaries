import axios from "axios";
import jwtDecode from "jwt-decode";

import baseURL from "../backend.js";

import { getCookie, setCookie } from "./cookie";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
    async (config) => {
        const accessToken = getCookie("accessToken");
        const currentTime = new Date().getTime();
        const decodedTime = jwtDecode(accessToken);
        if (decodedTime.exp * 1000 < currentTime) {
            const token = await getTokensFromRefreshToken();
            config.headers["authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

const getTokensFromRefreshToken = async () => {
    const refreshToken = getCookie("refreshToken");
    try {
        const response = await axios.post(`${baseURL}users/token-refresh`, { token: refreshToken });
        setCookie("accessToken", response.data.accessToken);
        setCookie("refreshToken", response.data.refreshToken);
        return response.data.accessToken;
    } catch (err) {
        console.log(err);
    }
};

export { axiosJWT };
