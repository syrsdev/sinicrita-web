import { MdAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";

const FloatingButton = ({ hiddenAddButton = false }: any) => {
  return (
    <NavLink
      to={"/post/add"}
      className={`${
        hiddenAddButton ? "hidden" : ""
      } flex items-center justify-center bg-primary font-bold text-[28px] text-white fixed bottom-5 right-5 w-12 h-12 rounded-lg`}
    >
      <MdAdd />
    </NavLink>
  );
};

export default FloatingButton;
