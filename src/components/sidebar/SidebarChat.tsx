import { useEffect, useState } from "react";
import Echo from "../../services/echo";
import useAuth from "../../hooks/useAuth";
import { getListChat } from "../../services/chat.service";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatTimestamp } from "../../hooks/useFormatTime";

interface Session {
  id: number;
  user1_id: number;
  user1: { username: string };
  user2_id: number;
  user2: { username: string };
  updated_at: string;
}

interface SidebarChatProps {
  isActive: string;
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarChat = ({ isActive, setIsActive }: SidebarChatProps) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchSessions = async () => {
    if (user?.id) {
      getListChat(user.id, (res) => {
        setSessions(res.data.data);
      });
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    const channelName = `user.${user?.id}`;
    const privateChannel = Echo.private(channelName);

    privateChannel.listen(".SessionCreated", (e: any) => {
      if (e.session.id == id && e.session.post_id == null) {
        navigate("/chat");
      }
      fetchSessions();
    });

    return () => {
      Echo.leave(`private-user.${user?.id}`);
    };
  }, [user?.id]);

  return (
    <div>
      <h1 className="font-bold text-center mt-6 text-[24px] flex items-center justify-between gap-2 mx-6">
        <Link to={"/post"}>
          <IoMdArrowBack className="cursor-pointer" />
        </Link>
        Direct Message
        <IoMdArrowBack style={{ visibility: "hidden" }} />
      </h1>
      <div className="flex flex-col mt-14 text-[16px] gap-3">
        {sessions.length === 0 && (
          <p className="text-gray-500 text-center">Belum ada pesan.</p>
        )}
        {sessions.map((item) => (
          <Link
            to={`/chat/${item.id}`}
            onClick={() => setIsActive(item.id.toString())}
            key={item.id}
            className={`hover:bg-white shadow px-6 py-4 rounded transition cursor-pointer ${
              parseInt(isActive) === item.id ? "bg-white" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-800">
                {user?.role === "pencerita"
                  ? item.user1.username
                  : item.user2.username}
              </div>
              <div className="text-xs text-gray-500">
                {formatTimestamp(item.updated_at)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarChat;
