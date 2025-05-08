import { FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const PostCard = ({ content, name, username, time }: any) => {
  const formatedDate = new Date(time);
  return (
    <div className="flex w-full p-7 justify-between gap-10 border-b-2 border-border">
      <Tooltip anchorSelect=".tooltip" place="top" className="z-50">
        Lihat detail dan tanggapi
      </Tooltip>
      <div className="flex gap-5">
        {/* <img src="" alt="" /> */}
        <div className="w-10 h-10 bg-amber-300 rounded-full"></div>
        <div className="flex flex-col">
          <p>
            {name} <span>@{username}</span>
          </p>
          <p>{content}</p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between gap-2">
        <Tooltip id="my-tooltip" />
        <p className="w-max">
          {formatedDate.toLocaleDateString("id-ID", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <Link to="/post" className="tooltip">
          <FaComments className="text-2xl hover:text-primary" />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
