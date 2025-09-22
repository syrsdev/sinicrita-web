import { FaPhoneAlt } from "react-icons/fa";
import FloatingButton from "../components/button/FloatingButton";
import { useAlert } from "../hooks/useAlert";
import Sidebar from "./Sidebar";

const MainLayout = ({
  sidebar,
  children,
  hiddenAddButton,
  userLogin,
  title,
  isCanCall = false,
  handleCallActive,
}: any) => {
  useAlert();

  return (
    <>
      <div className="flex h-[100dvh]">
        <Sidebar>{sidebar}</Sidebar>

        <div className="w-full lg:w-3/4 right-0 fixed">
          <div
            className={`w-full bg-primary h-[70px] text-[20px] text-white flex ${
              isCanCall
                ? "justify-between"
                : "justify-between lg:justify-center"
            }  font-bold items-center sticky top-0 z-50 px-5 lg:px-10`}
          >
            <h2 className="text-sm md:text-lg">
              {title == null
                ? userLogin?.role == "pendengar"
                  ? "Ayo Bantu Mendengarkan"
                  : "Jangan Ragu Bercerita"
                : title}
            </h2>
            <label>
              <div className="lg:hidden w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
                <input className="hidden peer" type="checkbox" />
                <div className="w-[50%] h-[2px] bg-white rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"></div>
                <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
                <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"></div>
              </div>
            </label>
            {isCanCall && (
              <FaPhoneAlt
                className="cursor-pointer"
                onClick={handleCallActive}
              />
            )}
          </div>
          <div className="flex absolute w-full">{children}</div>
        </div>
      </div>

      {(userLogin?.role == "pencerita" || userLogin == null) && (
        <FloatingButton hiddenAddButton={hiddenAddButton} />
      )}
    </>
  );
};

export default MainLayout;
