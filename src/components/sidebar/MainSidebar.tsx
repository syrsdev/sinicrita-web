import { TbHomeFilled } from "react-icons/tb";
import SideLink from "./SideLink";
import { MdEmail } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const MainSidebar = ({ onclick }: any) => {
  return (
    <div>
      <h1 className="font-bold text-center mt-5 text-[32px]">sinicrita</h1>
      <div className="flex flex-col mt-14 text-[20px] gap-10">
        <SideLink href="/post" hover="hover:bg-primary hover:text-white">
          <TbHomeFilled className="text-[26px]" /> Home
        </SideLink>
        <SideLink href="/dm" hover="hover:bg-primary hover:text-white">
          <MdEmail className="text-[26px]" /> Direct Message
        </SideLink>
        <SideLink href="/profile" hover="hover:bg-primary hover:text-white">
          <IoPersonCircle className="text-[26px]" /> Profile
        </SideLink>
        <SideLink onclick={onclick} hover="hover:bg-red-500 hover:text-white">
          <FiLogOut className="text-[26px]" /> Logout
        </SideLink>
      </div>
    </div>
  );
};

export default MainSidebar;
