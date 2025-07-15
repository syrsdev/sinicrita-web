import useAuth from "../../hooks/useAuth";
import FieldChat from "./FieldChat";

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
}

const DetailChat = ({ chat, session_id }: ChatProps) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-full justify-between pb-[70px] h-screen">
      <div className="w-full py-10 px-12 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {chat.map((item: any) => (
            <p
              key={item.id}
              className={`px-5 py-3 rounded-xl w-fit text-wrap max-w-2/5 ${
                item.sender_id == user?.id
                  ? "ms-auto bg-primary text-white"
                  : "me-auto bg-white"
              }`}
            >
              {item.message}
            </p>
          ))}
        </div>
      </div>
      <FieldChat session_id={session_id} sender_id={user?.id}></FieldChat>
    </div>
  );
};

export default DetailChat;
