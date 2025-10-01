import { FiLogIn, FiLogOut } from "react-icons/fi";
import SideLink from "../components/sidebar/SideLink";
import { TbHomeFilled } from "react-icons/tb";
import useAuth from "../hooks/useAuth";
import { MdEmail } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Logout } from "../services/auth.service";

const SidebarMobile = ({ isActive, onclick }: any) => {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    Logout(() => setUser(null));
  };

  return (
    <>
      {isActive && (
        <div className="w-full flex lg:hidden min-h-screen top-0 absolute left-0 z-100">
          <div
            onClick={onclick}
            className="w-1/5 md:w-1/2 bg-black min-h-screen  top-0 opacity-30"
          ></div>
          <div className="w-4/5 md:w-1/2 bg-main min-h-screen right-0 top-0 text-black ">
            <h3 className="my-5 px-5">Sinicrita</h3>
            <div className="flex flex-col gap-5 mt-10">
              <SideLink
                href={user == null ? "/" : "/post"}
                hover="hover:bg-primary hover:text-white"
              >
                <TbHomeFilled className="text-[26px]" /> Home
              </SideLink>

              {user?.role != "admin" && user != null && (
                <SideLink
                  href="/chat"
                  hover="hover:bg-primary hover:text-white"
                >
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
              {user == null && (
                <SideLink
                  href="/login"
                  hover="hover:bg-primary hover:text-white"
                >
                  <FiLogIn className="text-[26px]" /> Login
                </SideLink>
              )}
              {user != null && (
                <SideLink
                  onclick={handleLogout}
                  hover="hover:bg-red-500 hover:text-white"
                >
                  <FiLogOut className="text-[26px]" /> Logout
                </SideLink>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarMobile;
