import MainLayout from "../../layout/MainLayout";
import useAuth from "../../hooks/useAuth";
import SidebarChat from "../../components/sidebar/SidebarChat";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailChat from "./DetailChat";
import { getDetailChat } from "../../services/chat.service";
import Echo from "../../services/echo";
import CallLayout from "./call/CallLayout";

interface Session {
  id: number;
  user1_id: number;
  user1: { username: string };
  username: string;
  user2_id: number;
  user2: { username: string };
}

interface Chat {
  id: number;
  message: string;
  sender_id: number;
  session_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
}

const Chat = () => {
  const { user } = useAuth();
  const [isActive, setIsActive] = useState("");
  const [targetChat, setTargetChat] = useState<Session>({} as Session);
  const [chat, setChat] = useState<Chat[]>([]);
  const [isSent, setIsSent] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);

  const { id } = useParams();

  const fetchChat = async (id: string) => {
    getDetailChat(parseInt(id), (res) => {
      setChat(res.data.data.chat);
      setTargetChat(res.data.data.session);
    });
  };

  useEffect(() => {
    if (id) {
      setIsActive(id);
      if (!Number.isNaN(id)) {
        fetchChat(id);
      }
    } else {
      setIsActive("chat");
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const channelName = `chat.${id}`;
    const privateChannel = Echo.private(channelName);

    privateChannel.listen(".MessageSent", (e: any) => {
      setChat((prev) => {
        const exists = prev.some((m) => m.id === e.message.id);
        return exists ? prev : [...prev, e.message];
      });
      setIsSent(true);
    });

    return () => {
      Echo.leave(`private-chat.${id}`);
    };
  }, [id]);

  return (
    <MainLayout
      title={
        isActive != "chat" && user?.id == targetChat?.user1_id
          ? targetChat?.user2?.username
          : targetChat?.user1?.username
      }
      isCanCall={isActive != "chat"}
      sidebar={<SidebarChat isActive={isActive} setIsActive={setIsActive} />}
      userLogin={user}
      hiddenAddButton={true}
      isCallActive={isCallActive}
      setIsCallActive={setIsCallActive}
    >
      <div className="flex flex-col w-full h-max">
        {isCallActive && <CallLayout />}
        {isActive == "chat" ? (
          <div
            className={`flex items-center justify-center w-full h-screen flex-col ${
              isCallActive ? "pb-[230px]" : "pb-[70px]"
            }`}
          >
            <img
              src="./assets/chat.svg"
              alt="direct message"
              className="w-1/5"
            />
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
          <DetailChat
            isCallActive={isCallActive}
            chat={chat}
            session_id={targetChat.id}
            setIsSent={setIsSent}
            isSent={isSent}
          ></DetailChat>
        )}
      </div>
    </MainLayout>
  );
};

export default Chat;
