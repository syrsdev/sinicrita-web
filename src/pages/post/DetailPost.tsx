import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import MainLayout from "../../layout/MainLayout";
import MainSidebar from "../../components/sidebar/MainSidebar";
import {
  deletePost,
  detailPost,
  updatePost,
} from "../../services/post.service";
import Button from "../../components/button/Button";
import ButtonSecondary from "../../components/button/ButtonSecondary";
import { alert } from "../../hooks/useAlert";

type Post = {
  user: {
    id: number | undefined;
    username: string;
  };
  content: string;
  slug: string;
  created_at: string;
};

const DetailPost = () => {
  const [post, setPost] = useState({} as Post);
  const [IsEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const formatedDate = new Date(post?.created_at);

  useEffect(() => {
    detailPost(window.location.pathname, (res) => {
      if (res.status == 404) {
        setPost({} as Post);
      } else {
        setPost(res.data.data);
      }
    });
  }, []);

  const dataUpdate = {
    content: content,
  };

  const handleEditButton = () => {
    setIsEdit(!IsEdit);
    if (IsEdit == false) {
      setContent(post?.content);
    }
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    updatePost(dataUpdate, post?.slug);
  };

  const handleDelete = () => {
    alert
      .fire({
        title: "Konfirmasi Hapus",
        text: "Yakin ingin menghapus cerita ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus sekarang!",
        cancelButtonText: "Batal",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deletePost(post?.slug);
        }
      });
  };

  return (
    <MainLayout  sidebar={<MainSidebar />} userLogin={user}>
      <div className="p-10 bg-white w-full m-10 rounded-2xl flex flex-col gap-2">
        <div className="flex flex-col gap-1 mb-4">
          <h1 className="text-[22px] font-bold">
            Dibuat oleh{" "}
            <span className="text-primary">@{post?.user?.username}</span>
          </h1>
          <p>
            Pada{" "}
            {formatedDate.toLocaleDateString("id-ID", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        {IsEdit == false && <p className="text-[16px]">{post?.content}</p>}

        {user?.id == post?.user?.id && (
          <form onSubmit={handleUpdate} method="post">
            {IsEdit == true && (
              <textarea
                minLength={5}
                name="content"
                id="content"
                className="bg-white w-full rounded-2xl border-slate-600 border-2 outline-primary p-4 min-h-80"
                placeholder="Tulis cerita anda..."
                onChange={(e) => setContent(e.target.value)}
              >
                {content}
              </textarea>
            )}

            <div className="flex gap-8 justify-between mt-10">
              <Button
                onclick={() => handleEditButton()}
                bg="bg-primary hover:bg-[#2DB7B4FF]"
                classname="text-white"
              >
                {IsEdit == true ? "Batalkan" : "Edit"}
              </Button>
              {IsEdit == true ? (
                <ButtonSecondary type="submit">Simpan</ButtonSecondary>
              ) : (
                <ButtonSecondary onclick={() => handleDelete()}>
                  Hapus
                </ButtonSecondary>
              )}
            </div>
          </form>
        )}
      </div>
    </MainLayout>
  );
};

export default DetailPost;
