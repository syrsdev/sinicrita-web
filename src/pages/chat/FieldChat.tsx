import Button from "../../components/button/Button";
import { IoMdSend } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

const FieldChat = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  return (
    <form className="flex justify-between items-center gap-3 bg-primary p-3 w-full">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tulis sesuatu..."
        autoFocus
        className="w-full resize-none overflow-hidden rounded border bg-white border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <div className="w-fit text-white">
        <Button>
          <IoMdSend />
        </Button>
      </div>
    </form>
  );
};

export default FieldChat;
