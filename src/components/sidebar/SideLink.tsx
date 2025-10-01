import { NavLink } from "react-router-dom";

const SideLink = ({ children, href, onclick = () => {}, hover }: any) => {
  const active = window.location.pathname;

  return (
    <NavLink
      onClick={onclick}
      to={href == null ? active : href}
      className={`flex items-center gap-3 ${hover} ${
        active === href ? "bg-primary text-white" : "bg-white"
      }  rounded-e-full py-4 px-5 w-4/5 cursor-pointer text-sm lg:text-xl`}
    >
      {children}
    </NavLink>
  );
};

export default SideLink;
