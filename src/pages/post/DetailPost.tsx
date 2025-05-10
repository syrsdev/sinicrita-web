import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import MainLayout from "../../layout/MainLayout";
import MainSidebar from "../../components/sidebar/MainSidebar";
import { detailPost } from "../../services/post.service";

type Post = {
  user: {
    username: string;
  };
  content: string;
  created_at: string;
};

const DetailPost = () => {
  const [post, setPost] = useState({} as Post);
  const { user } = useAuth();

  useEffect(() => {
    detailPost(window.location.pathname, (res) =>
      res.status == 404 ? setPost({} as Post) : setPost(res.data.data)
    );
  }, []);

  return (
    <MainLayout title="Cerita" sidebar={<MainSidebar />} userLogin={user}>
      <div className="p-10 bg-white w-full m-10 rounded-xl flex flex-col gap-2">
        <h1 className="text-[22px] font-bold">
          Dibuat oleh{" "}
          <span className="text-primary">@{post?.user?.username}</span>
        </h1>
        <p className="text-[16px]">{post?.content}</p>
      </div>
    </MainLayout>
  );
};

export default DetailPost;
