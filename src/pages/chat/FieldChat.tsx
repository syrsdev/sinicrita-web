import Input from "../../components/input/Index";
import Button from "../../components/button/Button";
import { IoMdSend } from "react-icons/io";

const FieldChat = () => {
  return (
    <form className="flex justify-between items-center gap-3 bg-primary p-5 rounded-2xl">
      <Input
        autoFocus={true}
        placeholder="Kirim Tanggapan..."
        // onchange={(e: any) => setUsername(e.target.value)}
      ></Input>
      <div className="w-fit text-white">
        <Button>
          <IoMdSend />
        </Button>
      </div>
    </form>
  );
};

export default FieldChat;
