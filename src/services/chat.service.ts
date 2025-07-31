import { AxiosResponse } from "axios";
import { alert } from "../hooks/useAlert";
import api from "./axios.service";

export const createChat = (data: object) => {
  api
    .post("/chat/session", data)
    .then((res) => {
      window.location.href = `/chat/${res.data.data.id}`;
    })
    .catch((err) => {
      if (err.response.status != 401) {
        if (err.response.status === 301) {
          window.location.href = `/chat/${err.response.data.id}`;
        } else {
          alert.fire({
            title: "Oops...",
            text: err.response.data.message,
            icon: "error",
          });
        }
      } else {
        window.location.href = "/login";
      }
    });
};
export const getListChat = (
  id: number,
  callback: (res: AxiosResponse) => void
) => {
  api
    .get(`/chat/list/${id}`)
    .then((res) => {
      callback(res);
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

export const getDetailChat = (
  id: number,
  callback: (res: AxiosResponse) => void
) => {
  api
    .get(`/chat/detail/${id}`)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response.status == 404) {
        window.location.href = "/chat";
      } else if (err.response.status != 401) {
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

export const sendMessage = (data: object) => {
  api
    .post("/chat/message", data)
    .then(() => {})
    .catch((err) => {
      if (err.response.status != 401) {
        console.log(err.response.data);
        if (err.response.data.message == "validation.exists") {
          window.location.href = "/chat";
        } else {
          alert.fire({
            title: "Oops...",
            text: err.response.data.message,
            icon: "error",
          });
        }
      } else {
        window.location.href = "/login";
      }
    });
};
