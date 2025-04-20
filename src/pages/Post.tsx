import Button from "../components/Button";
import { alert, useAlert } from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import api from "../services/axios.service";

const Post = () => {
    const { user, setUser } = useAuth();
    useAlert();

    const handleLogout = () => {
        api.post("/logout")
            .then((res) => {
                const message = {
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                };

                sessionStorage.setItem("alert", JSON.stringify(message));
                setUser(null);
            })
            .catch((err) => {
                alert.fire({
                    title: "Oops...",
                    text: err.response?.data?.message || "Something went wrong",
                    icon: "error",
                });
            });
    };
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-1/6">
                <h1>Welcome, {user?.username}</h1>
                <Button onclick={handleLogout}>logout</Button>
            </div>
        </div>
    );
};

export default Post;
