import { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Index";
import Label from "../../components/input/Label";
import MainSidebar from "../../components/sidebar/MainSidebar";
import useAuth from "../../hooks/useAuth";
import MainLayout from "../../layout/MainLayout";

const Profile = () => {
  const { user } = useAuth();
  const [buttonDisable, setbuttonDisable] = useState(false);

  return (
    <MainLayout sidebar={<MainSidebar />} userLogin={user}>
      <div className="pb-[170px] lg:pb-[70px] pt-10 px-10 h-screen overflow-y-auto w-full">
        <h1 className="text-[20px] lg:text-[22px] text-center mb-5">
          Profile & Password
        </h1>
        <div className="p-5 md:p-10 bg-white w-full rounded-2xl flex flex-col gap-2 mt-4 mb-10">
          <h2 className="text-center text-[18px] lg:text-[20px]">Profile</h2>
          <div className="flex">
            <Label label="Username:" />
            <span className="ml-1 lg:ml-2">{user?.username}</span>
          </div>
          <div className="flex">
            <Label label="Role:" />
            <span className="ml-1 lg:ml-2">{user?.role}</span>
          </div>
        </div>
        <form className="p-5 md:p-10 bg-white w-full rounded-2xl flex flex-col gap-7 mt-4 mb-10">
          <h2 className="text-center text-[18px] lg:text-[20px]">
            Ubah Password
          </h2>
          <Input
            label="Password baru"
            bgColor="bg-slate-100"
            autoFocus={true}
            placeholder="Masukan password baru anda"
            onchange={() => {}}
            onkeydown={() => {}}
          ></Input>
          <Input
            label="Konfirmasi password baru"
            autoFocus={false}
            bgColor="bg-slate-100"
            placeholder="Masukan kembali password baru anda"
            onchange={() => {}}
            onkeydown={() => {}}
          ></Input>
          <Button
            type="submit"
            classname="mt-4"
            bg="bg-primary hover:bg-primary/90 text-white"
            disable={buttonDisable}
          >
            Masuk
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Profile;
