import { TbHomeFilled } from "react-icons/tb";
import SideLink from "./SideLink";
import { MdEmail } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import api from "../../services/axios.service";
import { alert } from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";

const MainSidebar = () => {
  const { setUser } = useAuth();

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
    <div>
      <h1 className="font-bold text-center mt-5 text-[32px]">sinicrita</h1>
      <div className="flex flex-col mt-14 text-[20px] gap-8">
        <SideLink href="/post" hover="hover:bg-primary hover:text-white">
          <TbHomeFilled className="text-[26px]" /> Home
        </SideLink>
        <SideLink href="/dm" hover="hover:bg-primary hover:text-white">
          <MdEmail className="text-[26px]" /> Direct Message
        </SideLink>
        <SideLink href="/profile" hover="hover:bg-primary hover:text-white">
          <IoPersonCircle className="text-[26px]" /> Profile
        </SideLink>
        <SideLink
          onclick={handleLogout}
          hover="hover:bg-red-500 hover:text-white"
        >
          <FiLogOut className="text-[26px]" /> Logout
        </SideLink>
      </div>
    </div>
  );
};

export default MainSidebar;
