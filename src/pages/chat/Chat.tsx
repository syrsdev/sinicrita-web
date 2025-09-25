// // pages/Chat.tsx
// import MainLayout from "../../layout/MainLayout";
// import useAuth from "../../hooks/useAuth";
// import SidebarChat from "../../components/sidebar/SidebarChat";
// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import DetailChat from "./DetailChat";
// import { getDetailChat } from "../../services/chat.service";
// import CallLayout from "./call/CallLayout";
// import { useCall } from "../../hooks/useCall"; // Pastikan path benar
// import Echo from "../../services/echo";

// interface Session {
//   id: number;
//   user1_id: number;
//   user1: { username: string };
//   user2_id: number;
//   user2: { username: string };
// }

// interface Chat {
//   id: number;
//   message: string;
//   sender_id: number;
//   session_id: number;
//   post_id: number;
//   created_at: string;
//   updated_at: string;
// }

// const Chat = () => {
//   const { user } = useAuth();
//   const [isActive, setIsActive] = useState("");
//   const [targetChat, setTargetChat] = useState<Session | null>(null);
//   const [chat, setChat] = useState<Chat[]>([]);
//   const [isSent, setIsSent] = useState(true);
//   const [isCallActive, setIsCallActive] = useState(false);
//   const [isCaller, setIsCaller] = useState(false);

//   const { id } = useParams();

//   const fetchChat = async (id: string) => {
//     getDetailChat(parseInt(id), (res) => {
//       setChat(res.data.data.chat);
//       setTargetChat(res.data.data.session);
//     });
//   };

//   useEffect(() => {
//     if (id) {
//       setIsActive(id);
//       if (!Number.isNaN(id)) {
//         fetchChat(id);
//       }
//     } else {
//       setIsActive("chat");
//     }
//   }, [id]);
//   useEffect(() => {
//     if (!targetChat?.id) return;

//     const channelName = `call.${targetChat.id}`;
//     const privateChannel = Echo.private(channelName);

//     privateChannel.listen(".CallOffer", (e: any) => {
//       console.log("📞 Panggilan masuk dari:", e.fromUserId);
//       console.log("📩 Offer:", e.offer);
//       if (!e.offer || !e.offer.type || !e.offer.sdp) {
//         console.error("❌ Offer rusak atau tidak lengkap");
//         return;
//       }
//       setIsCallActive(true); // ✅ Buka modal secara otomatis
//     });

//     privateChannel.listen(".CallEnded", () => {
//       console.log("🛑 Panggilan dibatalkan");
//       setIsCallActive(false);
//     });

//     privateChannel.listen(".CallMissed", () => {
//       console.log("🚫 Panggilan dilewatkan");
//       setIsCallActive(false);
//     });

//     return () => {
//       Echo.leave(channelName);
//     };
//   }, [targetChat?.id]);

//   useEffect(() => {
//     if (!id) return;

//     const channelName = `chat.${id}`;
//     const privateChannel = Echo.private(channelName);

//     privateChannel.listen(".MessageSent", (e: any) => {
//       setChat((prev) => {
//         const exists = prev.some((m) => m.id === e.message.id);
//         return exists ? prev : [...prev, e.message];
//       });
//       setIsSent(true);
//     });

//     return () => {
//       Echo.leave(`private-chat.${id}`);
//     };
//   }, [id]);

//   // ✅ Hitung peerId dan sessionId
//   const peerId = targetChat
//     ? user?.id === targetChat.user1_id
//       ? targetChat.user2_id
//       : targetChat.user1_id
//     : null;

//   const sessionId = targetChat?.id || null;

//   // ✅ SELALU panggil useCall — jangan kondisional!
//   const callProps = useCall({
//     peerId,
//     sessionId,
//     onCallEnded: () => handleCallClose,
//     enabled: isCallActive && !!sessionId && !!peerId, // ✅ Hanya aktifkan logika jika siap
//   });

//   const handleCallActive = () => {
//     setIsCallActive(true);
//     setIsCaller(true);
//   };
//   const handleCallClose = () => {
//     setIsCallActive(false);
//     setIsCaller(false);
//   };

//   return (
//     <MainLayout
//       title={
//         isActive !== "chat" && targetChat
//           ? user?.id === targetChat.user1_id
//             ? targetChat.user2?.username
//             : targetChat.user1?.username
//           : ""
//       }
//       isCanCall={isActive !== "chat" && !!targetChat}
//       sidebar={<SidebarChat isActive={isActive} setIsActive={setIsActive} />}
//       userLogin={user}
//       hiddenAddButton={true}
//       handleCallActive={handleCallActive}
//     >
//       <div className="flex flex-col w-full h-max">
//         {/* ✅ Render CallLayout hanya jika isCallActive dan callProps ada */}
//         {isCallActive && targetChat && callProps && (
//           <CallLayout
//             status={callProps.status}
//             localStream={callProps.localStream}
//             remoteStream={callProps.remoteStream}
//             isCaller={isCaller}
//             onStartCall={callProps.startCall}
//             onAccept={callProps.acceptCall}
//             onReject={callProps.rejectCall}
//             onEndCall={callProps.endCall}
//             onClose={() => handleCallClose()}
//           />
//         )}

//         {isActive === "chat" ? (
//           <div
//             className={`flex items-center justify-center w-full h-screen flex-col ${
//               isCallActive ? "pb-[230px]" : "pb-[70px]"
//             }`}
//           >
//             <img
//               src="./assets/chat.svg"
//               alt="direct message"
//               className="w-1/5"
//             />
//             <div>
//               {user?.role === "pendengar" ? (
//                 <p>
//                   mulai mendengarkan cerita atau{" "}
//                   <Link to="/post" className="text-primary">
//                     lihat postingan lainnya
//                   </Link>
//                 </p>
//               ) : (
//                 <p>
//                   mulai bercerita atau{" "}
//                   <Link to="/post/add" className="text-primary">
//                     buat postingan
//                   </Link>
//                 </p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <DetailChat
//             isCallActive={isCallActive}
//             chat={chat}
//             session_id={targetChat?.id}
//             setIsSent={setIsSent}
//             isSent={isSent}
//           />
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default Chat;
// pages/Chat.tsx
// pages/Chat.tsx
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

  // ✅ Hitung peerId dan sessionId
  const peerId = targetChat
    ? user?.id === targetChat.user1_id
      ? targetChat.user2_id
      : targetChat.user1_id
    : null;

  const sessionId = targetChat?.id || null;

  const handleCallActive = () => {
    setIsCallActive(true);
    setIsCaller(true);
  };

  const handleCallClose = () => {
    setIsCallActive(false);
    setIsCaller(false);
  };

  // ✅ Fungsi untuk menerima panggilan (dari luar useCall)
  // const handleIncomingCall = () => {
  //   setIsCallActive(true);
  //   setIsCaller(false); // Penerima panggilan
  // };

  // ✅ SELALU panggil useCall — enabled true jika ada call
  const callProps = useCall({
    peerId,
    sessionId,
    onCallEnded: handleCallClose,
    enabled: !!sessionId && !!peerId, // ✅ Selalu enabled jika session tersedia
  });

  useEffect(() => {
    if (!targetChat?.id) return;

    const channelName = `call.${targetChat.id}`;
    const privateChannel = Echo.private(channelName);

    privateChannel.listen(".CallOffer", (e: any) => {
      console.log("📞 Panggilan masuk dari:", e.fromUserId);
      console.log("📩 Offer (raw):", e.offer);

      if (e.fromUserId === user?.id) {
        console.log("➡️ Abaikan CallOffer dari diri sendiri");
        return;
      }

      let offerObj = e.offer;
      // ✅ kalau ternyata string, parse dulu
      if (typeof e.offer === "string") {
        try {
          offerObj = JSON.parse(e.offer);
        } catch (err) {
          console.error("❌ Offer bukan JSON valid:", e.offer);
          return;
        }
      }

      if (!offerObj.type || !offerObj.sdp) {
        console.error("❌ Offer rusak atau tidak lengkap:", offerObj);
        return;
      }

      setIsCallActive(true);
      setIsCaller(false);

      if (callProps.handleIncomingOffer) {
        callProps.handleIncomingOffer(offerObj); // ✅ sekarang pasti object valid
      }
    });

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
    >
      <div className="flex flex-col w-full h-max">
        {/* ✅ Render CallLayout hanya jika isCallActive dan callProps ada */}
        {isCallActive && targetChat && callProps && (
          <CallLayout
            status={callProps.status}
            localStream={callProps.localStream}
            remoteStream={callProps.remoteStream}
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
