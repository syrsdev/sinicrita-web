import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import FieldChat from "./FieldChat";
import { getDetailChat } from "../../services/chat.service";
import { useEffect, useState } from "react";

const DetailChat = ({ id }: { id: number }) => {
  const { user } = useAuth();
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (!Number.isNaN(id)) {
      getDetailChat(id, (res) => {
        setChat(res.data.data);
      });
    }
  }, [id]);
  console.log(chat);

  return (
    <div className="flex flex-col w-full justify-between pb-[70px] h-screen">
      <div className="w-full">
        <div className="flex flex-col gap-2 ">
          {chat.map((item: any) => (
            <p
              key={item.id}
              className={`bg-white p-5 ${
                item.sender_id == user?.id ? "ms-auto" : "me-auto"
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
