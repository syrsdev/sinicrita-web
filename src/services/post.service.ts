import { AxiosResponse } from "axios";
import api from "./axios.service";

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