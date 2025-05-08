import { AxiosResponse } from "axios";
import api from "./axios.service";
import { alert } from "../hooks/useAlert";

export const getPost = (callback: (res: AxiosResponse) => void) => {
    api
        .get("/post")
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            return callback(err.response);
        });
};

export const createPost = (data:object) => {
    api.post("/post", data)
    .then((res) => {
        const message: {
            title: string;
            text: string;
            icon: string;
        } = {
            title: "success",
            text: res.data.message,
            icon: "success",
        };
            sessionStorage.setItem("alert", JSON.stringify(message));
            window.location.href = "/post";
        })
    .catch((err) => {
        alert.fire({
            title: "Oops...",
            text: err.response.data.message,
            icon: "error",
        });
    });
}