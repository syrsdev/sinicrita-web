import axios from "axios";
import api from "./axios.service.ts";

export const getCsrfToken = async (): Promise<void> => {
    try {
        await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
            withCredentials: true,
        });
        console.log("CSRF token set");
    } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
    }
};
export const getUser = async (): Promise<void> => {
    try {
        const data = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user`,
            {
                withCredentials: true,
            }
        );
        console.log(data);
    } catch (error) {
        console.error("kiw", error);
    }
};

export const Login = (data: { username: string; password: string }) => {
    getCsrfToken();
    api.post("/login", data, {
        withCredentials: true,
    })
        .then((res) => {
            localStorage.setItem("success", res.data.message);
            // window.location.href = "/";
            getUser();
        })
        .catch((err) => console.log(err.response.data));
};
export const Register = (data: {
    username: string;
    password: string;
    role: string;
}) => {
    getCsrfToken();
    api.post("/register", data, {
        withCredentials: true,
    })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => console.log(err.response.data));
};
