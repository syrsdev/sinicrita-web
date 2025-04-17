import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const alert = withReactContent(Swal);

export const useAlert = () => {
    useEffect(() => {
        const showAlert = sessionStorage.getItem("alert");
        if (showAlert != null) {
            alert.fire(JSON.parse(showAlert));
            sessionStorage.removeItem("alert");
        }
    }, []);
};
