import { AxiosResponse } from "axios";
import api from "./axios.service";
import { alert } from "../hooks/useAlert";

export const getPost = (user: String | undefined ,callback: (res: AxiosResponse) => void) => {
    api
        .get(`/post/${user}`)
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            return callback(err.response);
        });
};
export const detailPost = (slug: string, callback: (res: AxiosResponse) => void) => {
    api
        .get(`${slug}`)
        .then((res) => {
            callback(res);
        })
        .catch((err) => {
            return callback(err.response);
        });
};

export const createPost = (data:object) => {
    api.post("/post", data)
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
}

export const updatePost = (data:object, slug:String) => {
    api.put(`/post/detail/${slug}`, data)
    .then(() => {
            window.location.href = `/post`;
        })
    .catch((err) => {
        alert.fire({
            title: "Oops...",
            text: err.response.data.message,
            icon: "error",
        });
    });
}

export const deletePost = (slug:String) => {
    api.delete(`/post/detail/${slug}/delete`)
    .then(() => {
            window.location.href = `/post`;
        })
    .catch((err) => {
        alert.fire({
            title: "Oops...",
            text: err.response.data.message,
            icon: "error",
        });
    });
}