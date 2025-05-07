import Button from "../../components/Button";
import MainSidebar from "../../components/sidebar/MainSidebar";
import MainLayout from "../../layout/MainLayout";

const AddPost = () => {
  return (
    <MainLayout
      title="Buat Cerita"
      sidebar={<MainSidebar />}
      hiddenAddButton={true}
    >
      <form className="w-full flex flex-col p-8 gap-10">
        <textarea
          autoFocus
          name=""
          id=""
          className="bg-white w-full rounded-2xl focus:outline-primary p-4 min-h-60"
          placeholder="Tulis cerita anda..."
        ></textarea>

        <Button classname="">Kirim</Button>
      </form>
    </MainLayout>
  );
};

export default AddPost;
