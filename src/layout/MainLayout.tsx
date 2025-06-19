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
      <div className="flex min-h-[100dvh]">
        <Sidebar>{sidebar}</Sidebar>

        <div className="w-3/4 absolute right-0">
          <h2 className="w-full bg-primary h-[70px] text-[20px] text-white flex justify-center font-bold items-center sticky top-0">
            {title == null
              ? userLogin.role == "pendengar"
                ? "Ayo Bantu Mendengarkan"
                : "Jangan Ragu Bercerita"
              : title}
          </h2>
          <div className="flex">{children}</div>
        </div>
      </div>

      {userLogin.role == "pencerita" && (
        <FloatingButton hiddenAddButton={hiddenAddButton} />
      )}
    </>
  );
};

export default MainLayout;
