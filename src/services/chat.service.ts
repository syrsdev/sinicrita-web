import { alert } from "../hooks/useAlert";
import api from "./axios.service";

export const createChat = (data:object) => {
    api.post("/chat/session", data)
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
            window.location.href = "/chat";
        })
    .catch((err) => {
        alert.fire({
            title: "Oops...",
            text: err.response.data.message,
            icon: "error",
        });
    });
}
