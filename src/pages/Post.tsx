import MainSidebar from "../components/sidebar/MainSidebar";
import { alert, useAlert } from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import MainLayout from "../layout/MainLayout";
import api from "../services/axios.service";

const Post = () => {
  const { setUser } = useAuth();
  useAlert();

  const handleLogout = () => {
    api
      .post("/logout")
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
    <MainLayout
      title="Post"
      sidebar={<MainSidebar onclick={handleLogout} />}
    ></MainLayout>
  );
};

export default Post;
