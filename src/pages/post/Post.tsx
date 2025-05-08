import { useEffect, useState } from "react";
import PostCard from "../../components/post/Card";
import MainSidebar from "../../components/sidebar/MainSidebar";
import MainLayout from "../../layout/MainLayout";
import { getPost } from "../../services/post.service";

const Post = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    getPost((res) =>
      res.status == 404 ? setPost([]) : setPost(res.data.data)
    );
  }, []);

  return (
    <MainLayout title="Cerita" sidebar={<MainSidebar />}>
      <div className="w-4/6 min-h-screen">
        {post.length == 0 ? (
          <div className="flex flex-col items-center gap-5 justify-center mt-5">
            <img
              src="./assets/post-not-found.svg"
              alt="post not found"
              width="50%"
            />
            <p className="text-[20px]">Belum ada cerita</p>
          </div>
        ) : (
          post.map((post: any) => (
            <PostCard
              key={post.id}
              name={post.user.name}
              username={post.user.username}
              content={post.content}
              time={post.created_at}
            />
          ))
        )}
      </div>
      <div className="w-2/6 border-s-2 border-border bg-main p-6">
        <div className="bg-white w-full p-5 rounded-xl shadow-2xl flex flex-col gap-3 text-center justify-center sticky top-20">
          <h3 className="text-[20px] font-semibold text-primary">
            💡Tips of the Day
          </h3>
          <p>“Healing takes time, and asking for help is a courageous step.”</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Post;
