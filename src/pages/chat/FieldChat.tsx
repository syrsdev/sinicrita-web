import Button from "../../components/button/Button";
import { IoMdSend } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../../services/chat.service";

interface SendMessageProps {
  session_id: number | undefined;
  sender_id: number | undefined;
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>;
}

const FieldChat = ({ session_id, sender_id, setIsSent }: SendMessageProps) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.style.overflowY =
        textareaRef.current.scrollHeight > textareaRef.current.offsetHeight
          ? "auto"
          : "hidden";
    }
  }, [value]);

  const data = {
    session_id: session_id,
    sender_id: sender_id,
    message: value,
    post_id: null,
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setValue("");
    window.scrollChatToBottom?.();
    sendMessage(data);
  };
  return (
    <form
      className="flex justify-between items-end gap-3 bg-primary p-3 w-full"
      method="post"
      onSubmit={handleSendMessage}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tulis sesuatu..."
        autoFocus
        required
        className="w-full resize-none overflow-hidden rounded border bg-white border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 overflow-y-hidden max-h-48"
      />
      <div className="w-[10%] text-white ">
        <Button
          type="submit"
          rounded="rounded"
          onclick={() => setIsSent(false)}
        >
          <IoMdSend className="text-xl" />
        </Button>
      </div>
    </form>
  );
};

export default FieldChat;
