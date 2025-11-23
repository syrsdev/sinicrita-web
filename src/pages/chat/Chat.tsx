import MainLayout from "../../layout/MainLayout";
import useAuth from "../../hooks/useAuth";
import SidebarChat from "../../components/sidebar/SidebarChat";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailChat from "./DetailChat";
import { getDetailChat } from "../../services/chat.service";
import CallLayout from "./call/CallLayout";
import { useCall } from "../../hooks/useCall";
import Echo from "../../services/echo";
import { initSocket } from "../../services/SocketIo";

interface Session {
  id: number;
  user1_id: number;
  user1: { username: string };
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
  const [targetChat, setTargetChat] = useState<Session | null>(null);
  const [chat, setChat] = useState<Chat[]>([]);
  const [isSent, setIsSent] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCaller, setIsCaller] = useState(false);

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

  // ✅ Inisialisasi WebSocket saat user login (dengan logging)
  useEffect(() => {
    if (user?.id) {
      console.log("🔧 Initializing WebSocket for user:", user.id);
      initSocket(user.id); // ✅ Panggil fungsi
    } else {
      console.log("⚠️ User not logged in, cannot init WebSocket");
    }
  }, [user?.id]);

  // ✅ Hitung peerId dan sessionId (dengan logging)
  const peerId = targetChat
    ? user?.id === targetChat.user1_id
      ? targetChat.user2_id
      : targetChat.user1_id
    : null;

  const sessionId = targetChat?.id || null;

  console.log("👤 Current User ID:", user?.id);
  console.log("👥 Peer ID:", peerId);
  console.log("🆔 Session ID:", sessionId);

  const handleCallActive = () => {
    console.log("📞 Starting call...");
    setIsCallActive(true);
    setIsCaller(true);
  };

  const handleCallClose = () => {
    console.log("📞 Call ended/closed");
    setIsCallActive(false);
    setIsCaller(false);
  };

  const handleCallReceived = () => {
    console.log("📞 Panggilan diterima, tampilkan modal");
    setIsCallActive(true);
    setIsCaller(false); // Penerima panggilan
  };

  // ✅ Gunakan useCall dengan logging
  const callProps = useCall({
    peerId,
    sessionId,
    onCallEnded: handleCallClose,
    onCallReceived: handleCallReceived,
    enabled: !!sessionId && !!peerId,
    userId: user?.id ?? 0,
  });

  console.log("📞 Call Props Status:", callProps.status);
  console.log("📞 Call Props Local Stream:", callProps.localStream);
  console.log("📞 Call Props Remote Stream:", callProps.remoteStream);

  // ✅ Gunakan Echo hanya untuk status panggilan
  useEffect(() => {
    if (!targetChat?.id) return;

    const channelName = `call.${targetChat.id}`;
    const privateChannel = Echo.private(channelName);

    // Status panggilan (masih pakai Reverb)
    privateChannel.listen(".CallEnded", () => {
      console.log("🛑 Panggilan dibatalkan");
      setIsCallActive(false);
    });

    privateChannel.listen(".CallMissed", () => {
      console.log("🚫 Panggilan dilewatkan");
      setIsCallActive(false);
    });

    return () => {
      Echo.leave(channelName);
    };
  }, [targetChat?.id]);

  // ✅ Chat message (masih pakai Reverb)
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
        isActive !== "chat" && targetChat
          ? user?.id === targetChat.user1_id
            ? targetChat.user2?.username
            : targetChat.user1?.username
          : ""
      }
      isCanCall={isActive !== "chat" && !!targetChat}
      sidebar={<SidebarChat isActive={isActive} setIsActive={setIsActive} />}
      userLogin={user}
      hiddenAddButton={true}
      handleCallActive={handleCallActive}
      isChat={isActive == "chat" ? true : false}
    >
      <div className="flex flex-col w-full h-max">
        {/* ✅ Render CallLayout */}
        {isCallActive && targetChat && callProps && (
          <CallLayout
            status={callProps.status}
            isCaller={isCaller}
            onStartCall={callProps.startCall}
            onAccept={callProps.acceptCall}
            onReject={callProps.rejectCall}
            onEndCall={callProps.endCall}
            onClose={handleCallClose}
          />
        )}

        {isActive === "chat" ? (
          <div
            className={`flex items-center justify-center w-full h-screen flex-col ${
              isCallActive ? "pb-[230px]" : "pb-[70px]"
            }`}
          >
            <img
              src="./assets/chat.svg"
              alt="direct message"
              className="w-1/2 lg:w-1/5"
            />
            <div>
              {user?.role === "pendengar" ? (
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
            session_id={targetChat?.id}
            setIsSent={setIsSent}
            isSent={isSent}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Chat;
