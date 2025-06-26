import React from "react";

const SidebarChat = () => {
  return (
    <div>
      <h1 className="font-bold text-center mt-5 text-[32px]">Direct Message</h1>
      <div className="flex flex-col mt-14 text-[20px] gap-8">
        {/* <SideLink href="/post" hover="hover:bg-primary hover:text-white">
          <TbHomeFilled className="text-[26px]" /> Home
        </SideLink>
        <SideLink href="/chat" hover="hover:bg-primary hover:text-white">
          <MdEmail className="text-[26px]" /> Direct Message
        </SideLink>
        <SideLink
          onclick={handleLogout}
          hover="hover:bg-red-500 hover:text-white"
        >
          <FiLogOut className="text-[26px]" /> Logout
        </SideLink> */}
      </div>
    </div>
  );
};

export default SidebarChat;
