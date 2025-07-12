import { AxiosResponse } from "axios";
import { alert } from "../hooks/useAlert";
import api from "./axios.service";

export const createChat = (data:object) => {
    api.post("/chat/session", data)
    .then(() => {
            window.location.href = "/chat";
        })
    .catch((err) => {
        if (err.response.status === 301) {
            window.location.href = `/chat/${err.response.data.id}`;
            
        }else{
            alert.fire({
                title: "Oops...",
                text: err.response.data.message,
                icon: "error",
            });
        }
    });
}
export const getListChat = (id: number,callback: (res: AxiosResponse) => void) => {
    api.get(`/chat/list/${id}`)
    .then((res) => {
        callback(res);
        })
    .catch((err) => {
        alert.fire({
            title: "Oops...",
            text: err.response.data.message,
            icon: "error",
        });
    });
}
export const getChatSession = (id: number,callback: (res: AxiosResponse) => void) => {
    api.get(`/chat/session/${id}`)
    .then((res) => {
        callback(res);
        })
    .catch((err) => {
        alert.fire({
            title: "Oops...",
            text: err.response.data.message,
            icon: "error",
        });
    });
}

export const getDetailChat = (id: number, callback: (res: AxiosResponse) => void) =>{
    api.get(`/chat/detail/${id}`)
    .then((res) => {
        callback(res);
        })
    .catch((err) => {
        alert.fire({
            title: "Oops...",
            text: err.response.data.message,
            icon: "error",
        });
    });
}
