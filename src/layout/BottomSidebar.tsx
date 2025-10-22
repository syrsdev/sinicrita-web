import { FaUserPen } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbHomeFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

interface UserProps {
  user: {
    role: string;
  };
}

const BottomSidebar = ({ user }: UserProps) => {
  return (
    <div className="flex lg:hidden bg-primary w-full sticky bottom-0 border-t border-border text-white rounded-t-4xl text-sm ">
      <Link
        to={"/"}
        className="flex flex-col gap-1 items-center justify-center w-full p-3 text-center"
      >
        <TbHomeFilled className="text-[22px]" />
        Home
      </Link>
      {user?.role != "admin" && window.location.pathname !== "/" && (
        <>
          <Link
            to={"/chat"}
            className="flex flex-col gap-1 items-center justify-center w-full p-3 text-center"
          >
            <MdEmail className="text-[22px]" />
            Messages
          </Link>
          <Link
            to={"/profile"}
            className="flex flex-col gap-1 items-center justify-center w-full p-3 text-center"
          >
            <FaUserPen className="text-[22px]" /> Profile
          </Link>
        </>
      )}
      {user?.role === "admin" && window.location.pathname !== "/" && (
        <Link
          to={"/dashboard"}
          className="flex flex-col gap-1 items-center justify-center w-full p-3 text-center"
        >
          <RxDashboard className="text-[22px]" />
          Dashboard
        </Link>
      )}
      {window.location.pathname === "/" && (
        <Link
          to={"/login"}
          className="flex flex-col gap-1 items-center justify-center w-full p-3 text-center"
        >
          <FiLogIn className="text-[22px]" /> Login
        </Link>
      )}
    </div>
  );
};

export default BottomSidebar;
