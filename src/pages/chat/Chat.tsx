import MainLayout from "../../layout/MainLayout";
import useAuth from "../../hooks/useAuth";
import SidebarChat from "../../components/sidebar/SidebarChat";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailChat from "./DetailChat";

const Chat = () => {
  const { user } = useAuth();
  const [isActive, setIsActive] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsActive(id);
    } else {
      setIsActive("chat");
    }
  }, [id]);

  return (
    <MainLayout
      sidebar={<SidebarChat isActive={isActive} setIsActive={setIsActive} />}
      userLogin={user}
      hiddenAddButton={true}
    >
      {isActive == "chat" ? (
        <div className="flex items-center justify-center w-full h-screen flex-col">
          <img src="./assets/chat.svg" alt="direct message" className="w-1/5" />
          <div>
            {user?.role == "pendengar" ? (
              <p>
                mulai mendengarkan cerita atau{" "}
                <Link to="/post" className="text-primary">
                  lihat postingan lainnya
                </Link>
              </p>
            ) : (
              <p>
                mulai bercerita atau{" "}
                <Link to="/post/add" className="text-primary">
                  buat postingan
                </Link>
              </p>
            )}
          </div>
        </div>
      ) : (
        <DetailChat></DetailChat>
      )}
    </MainLayout>
  );
};

export default Chat;
