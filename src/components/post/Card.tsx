import { FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const PostCard = ({ content, username, time, userLogin, slug }: any) => {
  const formatedDate = new Date(time);
  console.log(userLogin);

  return (
    <div className="flex w-full p-7 justify-between gap-10 border-b-2 border-border">
      <Tooltip anchorSelect=".tooltip" place="top" className="z-50">
        Lihat detail {userLogin.role == "pendengar" && "dan tanggapi"}
      </Tooltip>
      <div className="flex gap-5">
        <div className="flex flex-col w-full">
          <p className="text-primary">@{username}</p>
          <p className="line-clamp-2">{content}</p>
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
        <Link to={`/post/${slug}`} className="tooltip">
          <FaComments className="text-2xl hover:text-primary" />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
