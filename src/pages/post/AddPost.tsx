import { useState } from "react";
import Button from "../../components/Button";
import MainSidebar from "../../components/sidebar/MainSidebar";
import MainLayout from "../../layout/MainLayout";
import { createPost } from "../../services/post.service";
import useAuth from "../../hooks/useAuth";

const AddPost = () => {
  const [content, setContent] = useState("");
  const { user } = useAuth();

  const data = {
    user_id: user?.id,
    content: content,
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createPost(data);
  };
  return (
    <MainLayout
      title="Buat Cerita"
      sidebar={<MainSidebar />}
      hiddenAddButton={true}
      userLogin={user}
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col p-8 gap-10">
        <textarea
          minLength={5}
          autoFocus
          name="content"
          id="content"
          className="bg-white w-full rounded-2xl focus:outline-primary p-4 min-h-60"
          placeholder="Tulis cerita anda..."
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <Button type="submit" classname="text-white" bg="bg-primary">
          Kirim
        </Button>
      </form>
    </MainLayout>
  );
};

export default AddPost;
