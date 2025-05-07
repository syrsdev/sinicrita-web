const PostCard = ({ content, name, username, time }: any) => {
  const formatedDate = new Date(time);
  return (
    <div className="flex w-full p-7 justify-between border-b-2 border-border">
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

      <div className="flex flex-col">
        <p>
          {formatedDate.toLocaleDateString("id-ID", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
