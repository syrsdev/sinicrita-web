import { AxiosResponse } from "axios";
import api from "../axios.service";

export const getDashboard = (callback: (res: AxiosResponse) => void) => {
  api
    .get("/dashboard")
    .then((res) => callback(res))
    .catch((err) => callback(err.response));
};
