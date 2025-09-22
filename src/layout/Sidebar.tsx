import { PropsWithChildren } from "react";

const Sidebar = ({ children }: PropsWithChildren) => {
  return (
    <div className="hidden lg:flex fixed w-1/4 h-screen border-r-2 border-border bg-main">
      {children}
    </div>
  );
};

export default Sidebar;
