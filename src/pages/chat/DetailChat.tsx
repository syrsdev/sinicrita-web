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
}

const DetailChat = ({ chat }: ChatProps) => {
  const { user } = useAuth();
  console.log(chat);

  return (
    <div className="flex flex-col w-full justify-between pb-[70px] h-screen">
      <div className="w-full mt-10 px-12">
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
      <FieldChat></FieldChat>
    </div>
  );
};

export default DetailChat;
