import { useEffect, useState } from "react";
import Echo from "../../services/echo";
import useAuth from "../../hooks/useAuth";
import { getListChat } from "../../services/chat.service";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

interface Session {
  id: number;
  user1_id: number;
  user2_id: number;
  created_at: string;
}

const SidebarChat = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const { user } = useAuth();

  const fetchSessions = async () => {
    if (user?.id) {
      getListChat(user.id, (res) => {
        setSessions(res.data.data);
        console.log("Updated sessions:", res.data.data);
      });
    }
  };

  // Panggil saat pertama kali dan saat ada event
  useEffect(() => {
    fetchSessions();
  }, [user]);

  useEffect(() => {
    const channelName = `user.${user?.id}`;
    const privateChannel = Echo.private(channelName);

    privateChannel.listen(".SessionCreated", () => {
      fetchSessions(); // Refetch list chat
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
      <div className="flex flex-col mt-14 text-[20px] gap-8">
        {sessions.length === 0 && (
          <p className="text-gray-500 text-center">Belum ada pesan.</p>
        )}
        {sessions.map((s) => (
          <div
            key={s.id}
            className="bg-white shadow p-4 rounded hover:bg-gray-100 transition"
          >
            <div className="font-semibold text-gray-800">Session #{s.id}</div>
            <div className="text-sm text-gray-500">
              {new Date(s.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarChat;
