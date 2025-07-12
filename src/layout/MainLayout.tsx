import FloatingButton from "../components/button/FloatingButton";
import { useAlert } from "../hooks/useAlert";
import Sidebar from "./Sidebar";

const MainLayout = ({
  sidebar,
  children,
  hiddenAddButton,
  userLogin,
  title,
}: any) => {
  useAlert();

  if (userLogin == null) return (window.location.href = "/");

  return (
    <>
      <div className="flex h-[100dvh]">
        <Sidebar>{sidebar}</Sidebar>

        <div className="w-3/4 right-0 fixed">
          <div className="w-full bg-primary h-[70px] text-[20px] text-white flex justify-center font-bold items-center sticky top-0 z-50">
            <h2>
              {title == null
                ? userLogin.role == "pendengar"
                  ? "Ayo Bantu Mendengarkan"
                  : "Jangan Ragu Bercerita"
                : title}
            </h2>
          </div>
          <div className="flex absolute w-full">{children}</div>
        </div>
      </div>

      {userLogin.role == "pencerita" && (
        <FloatingButton hiddenAddButton={hiddenAddButton} />
      )}
    </>
  );
};

export default MainLayout;
