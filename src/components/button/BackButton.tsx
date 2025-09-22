import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const BackButton = ({ to = "/" }: { to?: string }) => {
  return (
    <Link to={to} className="flex items-center gap-2 text-slate-800">
      <IoMdArrowRoundBack /> Kembali
    </Link>
  );
};

export default BackButton;
