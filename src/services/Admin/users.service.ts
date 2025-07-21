import { AxiosResponse } from "axios";
import api from "../axios.service";

export const getUsers = (callback: (res: AxiosResponse) => void) => {
  api
    .get("/dashboard/users")
    .then((res) => callback(res))
    .catch((err) => callback(err.response));
};

export const deleteUser = (
  username: String,
  callback: (res: AxiosResponse) => void
) => {
  api
    .delete(`/dashboard/users/${username}`)
    .then((res) => callback(res))
    .catch((err) => callback(err.response));
};
