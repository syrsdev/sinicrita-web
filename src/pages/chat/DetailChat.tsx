import { useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import FieldChat from "./FieldChat";
import dayjs from "dayjs";
import "dayjs/locale/id";

interface DetailChat {
  id: number;
  message: string;
  sender_id: number;
  created_at: string;
  updated_at: string;
}

interface ChatProps {
  chat: DetailChat[];
  session_id: number | undefined;
  isSent: boolean;
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>;
  isCallActive: boolean;
}

declare global {
  interface Window {
    scrollChatToBottom?: () => void;
  }
}

const DetailChat = ({
  chat,
  session_id,
  isSent,
  setIsSent,
  isCallActive,
}: ChatProps) => {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();

    window.scrollChatToBottom = scrollToBottom;
  }, [chat]);

  const groupedChat = chat.reduce(
    (groups: Record<string, DetailChat[]>, message) => {
      const dateKey = dayjs(message.created_at).format("YYYY-MM-DD");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
      return groups;
    },
    {}
  );

  return (
    <div
      className={`flex flex-col w-full justify-between h-screen ${
        isCallActive ? "pb-[230px]" : "pb-[70px]"
      }`}
    >
      <div className="w-full py-5 px-12 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {Object.entries(groupedChat).map(([date, messages]) => (
            <div key={date} className="flex flex-col gap-2">
              <div className="flex justify-center items-center w-full sticky my-5 top-0">
                <span className="text-center text-gray-500 font-medium bg-main w-max px-3 rounded-full">
                  {dayjs(date).locale("id").format("D MMMM YYYY")}
                </span>
              </div>

              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col gap-2 w-full mb-2`}
                >
                  <p
                    className={`px-5 py-3 rounded-xl w-max text-wrap max-w-3/5 ${
                      item.sender_id === user?.id
                        ? "ms-auto bg-primary text-white"
                        : "me-auto bg-white"
                    }`}
                  >
                    {item.message}
                  </p>
                  <span
                    className={`text-xs text-gray-400 ${
                      item.sender_id === user?.id ? "ms-auto" : "me-auto"
                    }`}
                  >
                    {dayjs(item.updated_at).format("HH:mm")}
                  </span>
                </div>
              ))}
            </div>
          ))}

          {isSent == false && (
            <div className="text-center text-gray-500 font-medium">
              Mengirim Pesan...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <FieldChat
        session_id={session_id}
        sender_id={user?.id}
        setIsSent={setIsSent}
      />
    </div>
  );
};

export default DetailChat;
