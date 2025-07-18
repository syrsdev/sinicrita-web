import axios from "axios";
import api from "./axios.service.ts";
import { alert } from "../hooks/useAlert.ts";

export const getCsrfToken = async (): Promise<void> => {
  try {
    await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
};
export const getUser = async () => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/user`,
      {
        withCredentials: true,
      }
    );
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const Login = (data: { username: string; password: string }) => {
  getCsrfToken();
  api
    .post("/login", data, {
      withCredentials: true,
    })
    .then(() => {
      window.location.href = "/post";
    })
    .catch((err) => {
      alert.fire({
        title: "Oops...",
        text: err.response.data.message,
        icon: "error",
      });
    });
};
export const Register = (data: {
  username: string;
  password: string;
  role: string;
  password_confirmation: string;
}) => {
  getCsrfToken();
  api
    .post("/register", data, {
      withCredentials: true,
    })
    .then(() => {
      window.location.href = "/";
    })
    .catch((err) => {
      alert.fire({
        title: "Oops...",
        text: err.response.data.message,
        icon: "error",
      });
    });
};
