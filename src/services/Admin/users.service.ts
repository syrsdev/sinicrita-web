import { AxiosResponse } from "axios";
import api from "../axios.service";
import { alert } from "../../hooks/useAlert";

export const getUsers = (callback: (res: AxiosResponse) => void) => {
  api
    .get("/dashboard/users")
    .then((res) => callback(res))
    .catch((err) => callback(err.response));
};

export const addUser = (data: {
  username: string;
  password: string;
  role: string;
  password_confirmation: string;
}) => {
  api
    .post("/dashboard/users/add", data, {
      withCredentials: true,
    })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      alert.fire({
        title: "Oops...",
        text: err.response.data.message,
        icon: "error",
      });
    });
};

export const deleteUser = (
  username: String,
  callback: (res: AxiosResponse) => void
) => {
  api
    .delete(`/dashboard/users/${username}/delete`)
    .then((res) => callback(res))
    .catch((err) => callback(err.response));
};
