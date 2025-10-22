import { FaPhoneAlt } from "react-icons/fa";
import FloatingButton from "../components/button/FloatingButton";
import { useAlert } from "../hooks/useAlert";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import BottomSidebar from "./BottomSidebar";
import { FiLogOut } from "react-icons/fi";
import { Logout } from "../services/auth.service";
import useAuth from "../hooks/useAuth";

const MainLayout = ({
  sidebar,
  children,
  hiddenAddButton,
  userLogin,
  title,
  isCanCall = false,
  handleCallActive,
  isChat,
}: any) => {
  // const [isSidabarActive, setIsSidebarActive] = useState(false);
  const { setUser } = useAuth();
  useAlert();

  const handleLogout = () => {
    Logout(() => setUser(null));
  };

  return (
    <>
      <div className="flex h-[100dvh]">
        <Sidebar isChat={isChat}>{sidebar}</Sidebar>

        <div
          className={`${
            isChat ? "hidden md:inline-block md:w-3/5" : "w-full"
          } lg:w-3/4 right-0 fixed`}
        >
          <div
            className={`w-full bg-primary h-[70px] text-[20px] text-white flex ${
              isCanCall
                ? "justify-between"
                : "justify-between lg:justify-center"
            }  font-bold items-center sticky top-0 z-50 px-5 lg:px-10`}
          >
            <div className="flex gap-5 justify-center items-center">
              {isCanCall && (
                <Link to={"/chat"} className="lg:hidden text-lg">
                  <IoMdArrowBack className="cursor-pointer" />
                </Link>
              )}
              <h2 className="text-lg">
                {title == null
                  ? userLogin?.role == "pendengar"
                    ? "Ayo Bantu Mendengarkan"
                    : "Jangan Ragu Bercerita"
                  : title}
              </h2>
            </div>
            {isCanCall && (
              <FaPhoneAlt
                className="cursor-pointer"
                onClick={handleCallActive}
              />
            )}
            {window.location.pathname !== "/" && !isCanCall && !isChat && (
              <>
                <button
                  onClick={handleLogout}
                  className="flex gap-2 items-center cursor-pointer hover:text-red-500 lg:hidden"
                >
                  <FiLogOut className="text-[18px]" />{" "}
                  <span className="text-[14px]">Logout</span>
                </button>
                {/* <SidebarMobile
                  isActive={isSidabarActive}
                  onclick={() => setIsSidebarActive(false)}
                />
                <SidebarButton
                  onclick={() => setIsSidebarActive(!isSidabarActive)}
                  checked={isSidabarActive}
                /> */}
              </>
            )}
          </div>
          <div className="flex absolute w-full">{children}</div>
        </div>
      </div>
      {!isCanCall && !isChat && <BottomSidebar user={userLogin} />}
      {(userLogin?.role == "pencerita" || userLogin == null) && (
        <FloatingButton hiddenAddButton={hiddenAddButton} />
      )}
    </>
  );
};

export default MainLayout;
