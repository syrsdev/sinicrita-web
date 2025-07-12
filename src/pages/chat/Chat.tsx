import MainLayout from "../../layout/MainLayout";
import useAuth from "../../hooks/useAuth";
import SidebarChat from "../../components/sidebar/SidebarChat";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailChat from "./DetailChat";
import { getChatSession } from "../../services/chat.service";

interface Session {
  id: number;
  user1_id: number;
  user1: { username: string };
  username: string;
  user2_id: number;
  user2: { username: string };
}

const Chat = () => {
  const { user } = useAuth();
  const [isActive, setIsActive] = useState("");
  const [targetChat, setTargetChat] = useState<Session>({} as Session);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsActive(id);
      getChatSession(parseInt(id), (res) => {
        setTargetChat(res.data.data);
      });
    } else {
      setIsActive("chat");
    }
  }, [id]);

  return (
    <MainLayout
      title={
        isActive != "chat" && user?.id == targetChat?.user1_id
          ? targetChat?.user2?.username
          : targetChat?.user1?.username
      }
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
        <DetailChat id={parseInt(isActive)}></DetailChat>
      )}
    </MainLayout>
  );
};

export default Chat;
