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

        <div className="w-3/4 right-0 fixed">
          <div
            className={`w-full bg-primary h-[70px] text-[20px] text-white flex ${
              isCanCall ? "justify-between" : "justify-center"
            }  font-bold items-center sticky top-0 z-50 px-10`}
          >
            <h2>
              {title == null
                ? userLogin?.role == "pendengar"
                  ? "Ayo Bantu Mendengarkan"
                  : "Jangan Ragu Bercerita"
                : title}
            </h2>
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
