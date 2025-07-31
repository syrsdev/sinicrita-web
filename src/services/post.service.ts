import { AxiosResponse } from "axios";
import api from "./axios.service";
import { alert } from "../hooks/useAlert";

export const getPost = (
  user: String | undefined,
  callback: (res: AxiosResponse) => void
) => {
  api
    .get(`/post/${user}`)
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
export const getGuestPost = (callback: (res: AxiosResponse) => void) => {
  api
    .get(`/post/guest`)
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

export const detailPost = (
  slug: string,
  callback: (res: AxiosResponse) => void
) => {
  api
    .get(`${slug}`)
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

export const createPost = (data: object) => {
  api
    .post("/post", data)
    .then(() => {
      window.location.href = "/post";
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

export const updatePost = (data: object, slug: String) => {
  api
    .put(`/post/detail/${slug}`, data)
    .then(() => {
      window.location.href = `/post`;
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
export const updateStatus = (data: object, slug: String) => {
  api
    .put(`/post/detail/${slug}/status`, data)
    .then(() => {
      window.location.href = `/post`;
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

export const deletePost = (slug: String) => {
  api
    .delete(`/post/detail/${slug}/delete`)
    .then(() => {
      window.location.href = `/post`;
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
