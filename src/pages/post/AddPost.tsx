import { useState } from "react";
import Button from "../../components/button/Button";
import MainSidebar from "../../components/sidebar/MainSidebar";
import MainLayout from "../../layout/MainLayout";
import { createPost } from "../../services/post.service";
import useAuth from "../../hooks/useAuth";
import BackButton from "../../components/button/BackButton";

const AddPost = () => {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const [buttonDisable, setbuttonDisable] = useState(false);

  const data = {
    user_id: user?.id,
    content: content,
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createPost(data);
    setbuttonDisable(true);

    setTimeout(() => {
      setbuttonDisable(false);
    }, 1000);
  };
  return (
    <MainLayout
      title="Buat Cerita"
      sidebar={<MainSidebar />}
      hiddenAddButton={true}
      userLogin={user}
    >
      <div className="w-full overflow-y-auto h-screen pb-[170px] lg:pb-[70px]">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col p-8 gap-10"
        >
          <div className="flex gap-3 flex-col">
            <BackButton />
            <textarea
              autoFocus
              name="content"
              id="content"
              className="bg-white w-full rounded-2xl focus:outline-primary p-4 min-h-60"
              placeholder="Tulis cerita anda..."
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <Button
            disable={buttonDisable}
            type="submit"
            classname="text-white"
            bg="bg-primary"
          >
            Kirim
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddPost;
