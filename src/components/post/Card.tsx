const PostCard = ({ content, name, username }: any) => {
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
        <p>11.32 PM</p>
      </div>
    </div>
  );
};

export default PostCard;
