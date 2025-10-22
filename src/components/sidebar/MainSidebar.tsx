import { TbHomeFilled } from "react-icons/tb";
import SideLink from "./SideLink";
import { MdEmail } from "react-icons/md";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { Logout } from "../../services/auth.service";
import { RxDashboard } from "react-icons/rx";
import { FaUserPen } from "react-icons/fa6";

const MainSidebar = () => {
  const { user, setUser } = useAuth();
  const handleLogout = () => {
    Logout(() => setUser(null));
  };

  return (
    <div className="flex flex-col justify-between h-screen w-full">
      <div>
        <h1 className="font-bold text-center mt-5 text-[32px]">Sinicrita</h1>
        <div className="flex flex-col mt-14 text-[20px] gap-8">
          <SideLink
            href={user == null ? "/" : "/post"}
            hover="hover:bg-primary hover:text-white"
          >
            <TbHomeFilled className="text-[24px]" /> Home
          </SideLink>
          {user?.role != "admin" && user != null && (
            <>
              <SideLink href="/chat" hover="hover:bg-primary hover:text-white">
                <MdEmail className="text-[24px]" /> Direct Message
              </SideLink>
              <SideLink
                href="/profile"
                hover="hover:bg-primary hover:text-white"
              >
                <FaUserPen className="text-[24px]" /> Profile
              </SideLink>
            </>
          )}
          {user?.role == "admin" && (
            <SideLink
              href="/dashboard"
              hover="hover:bg-primary hover:text-white"
            >
              <RxDashboard className="text-[24px]" /> Dashboard
            </SideLink>
          )}
          {user == null && (
            <SideLink href="/login" hover="hover:bg-primary hover:text-white">
              <FiLogIn className="text-[24px]" /> Login
            </SideLink>
          )}
          {user != null && (
            <SideLink
              onclick={handleLogout}
              hover="hover:bg-red-500 hover:text-white"
            >
              <FiLogOut className="text-[24px]" /> Logout
            </SideLink>
          )}
        </div>
      </div>
      {/* <span className="ml-5 mb-3 cursor-pointer hover:text-primary">
        Meet Developer
      </span> */}
    </div>
  );
};

export default MainSidebar;
