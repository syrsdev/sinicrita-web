import { TbHomeFilled } from "react-icons/tb";
import SideLink from "./SideLink";
import { MdEmail } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { Logout } from "../../services/auth.service";
import { RxDashboard } from "react-icons/rx";

const MainSidebar = () => {
  const { user, setUser } = useAuth();
  const handleLogout = () => {
    Logout(() => setUser(null));
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <h1 className="font-bold text-center mt-5 text-[32px]">sinicrita</h1>
        <div className="flex flex-col mt-14 text-[20px] gap-8">
          <SideLink href="/post" hover="hover:bg-primary hover:text-white">
            <TbHomeFilled className="text-[26px]" /> Home
          </SideLink>
          {user?.role != "admin" && (
            <SideLink href="/chat" hover="hover:bg-primary hover:text-white">
              <MdEmail className="text-[26px]" /> Direct Message
            </SideLink>
          )}
          {user?.role == "admin" && (
            <SideLink
              href="/dashboard"
              hover="hover:bg-primary hover:text-white"
            >
              <RxDashboard className="text-[26px]" /> Dashboard
            </SideLink>
          )}
          <SideLink
            onclick={handleLogout}
            hover="hover:bg-red-500 hover:text-white"
          >
            <FiLogOut className="text-[26px]" /> Logout
          </SideLink>
        </div>
      </div>
      {/* <span className="ml-5 mb-3 cursor-pointer hover:text-primary">
        Meet Developer
      </span> */}
    </div>
  );
};

export default MainSidebar;
