import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import MainLayout from "../../layout/MainLayout";
import MainSidebar from "../../components/sidebar/MainSidebar";
import {
  deletePost,
  detailPost,
  updatePost,
  updateStatus,
} from "../../services/post.service";
import Button from "../../components/button/Button";
import ButtonSecondary from "../../components/button/ButtonSecondary";
import { alert } from "../../hooks/useAlert";
import { createChat } from "../../services/chat.service";
import BackButton from "../../components/button/BackButton";

type Post = {
  id: number;
  user: {
    id: number | undefined;
    username: string;
  };
  content: string;
  slug: string;
  status: string;
  created_at: string;
};

const DetailPost = () => {
  const [post, setPost] = useState({} as Post);
  const [IsEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const formatedDate = new Date(post?.created_at);
  const [buttonDisable, setbuttonDisable] = useState(false);

  useEffect(() => {
    setbuttonDisable(true);

    detailPost(window.location.pathname, (res) => {
      if (res.status == 404) {
        setPost({} as Post);
      } else {
        setPost(res.data.data);
        setbuttonDisable(false);
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
  const handleStatus = () => {
    alert
      .fire({
        title: "Selesaikan Cerita",
        text: "cerita tidak lagi dapat diedit, dihapus, dan mendapat respon. Yakin akan diselesaikan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, selesaikan sekarang!",
        cancelButtonText: "Batal",
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateStatus({ status: "selesai" }, post?.slug);
        }
      });
  };
  const handleChatResponse = () => {
    createChat({
      user1_id: user?.id,
      user2_id: post?.user?.id,
      post_id: post?.id,
    });
    setbuttonDisable(true);

    setTimeout(() => {
      setbuttonDisable(false);
    }, 1000);
  };

  return (
    <MainLayout sidebar={<MainSidebar />} userLogin={user}>
      <div className="pb-[170px] lg:pb-[70px] pt-10 px-10 h-screen overflow-y-auto w-full">
        <BackButton />
        <div className="p-5 md:p-10 bg-white w-full rounded-2xl flex flex-col gap-2 mt-4">
          <div className="flex flex-col gap-1 mb-4">
            <div className="md:ms-auto text-sm">
              {post?.status != "selesai" ? (
                user?.id == post?.user?.id && (
                  <ButtonSecondary onclick={handleStatus}>
                    Tutup dan selesaikan cerita
                  </ButtonSecondary>
                )
              ) : (
                <ButtonSecondary disable={true}>
                  Cerita sudah selesai
                </ButtonSecondary>
              )}
            </div>
            <h1 className="text-lg md:text-[22px] font-bold mt-5 md:mt-0">
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

          {user?.id == post?.user?.id && post?.status != "selesai" && (
            <form onSubmit={handleUpdate} method="post">
              {IsEdit == true && (
                <textarea
                  minLength={5}
                  name="content"
                  id="content"
                  className="bg-white w-full rounded-2xl border-slate-600 border-2 outline-primary p-4 min-h-80"
                  placeholder="Tulis cerita anda..."
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                ></textarea>
              )}

              <div className="flex gap-3 md:gap-8 justify-between mt-10 text-sm">
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

          {user?.role == "pendengar" && post?.status != "selesai" && (
            <Button
              onclick={() => handleChatResponse()}
              bg="bg-primary hover:bg-[#2DB7B4FF]"
              classname="text-white  mt-20"
              disable={buttonDisable}
            >
              Kirim Respon di Chat
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DetailPost;
