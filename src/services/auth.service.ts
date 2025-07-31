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
  const data = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user`, {
    withCredentials: true,
  });
  return data.data;
};

export const Login = (data: { username: string; password: string }) => {
  getCsrfToken();
  api
    .post("/login", data, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.role === "admin") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/post";
      }
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
      window.location.href = "/login";
    })
    .catch((err) => {
      alert.fire({
        title: "Oops...",
        text: err.response.data.message,
        icon: "error",
      });
    });
};

export const Logout = (callback: () => void) => {
  api
    .post("/logout")
    .then(() => {
      callback();
    })
    .catch((err) => {
      if (err.response.status != 401) {
        alert.fire({
          title: "Oops...",
          text: err.response.data.message,
          icon: "error",
        });
      } else {
        window.location.href = "/login";
      }
    });
};
