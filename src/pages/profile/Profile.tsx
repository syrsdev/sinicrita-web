import { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Index";
import Label from "../../components/input/Label";
import MainSidebar from "../../components/sidebar/MainSidebar";
import useAuth from "../../hooks/useAuth";
import MainLayout from "../../layout/MainLayout";
import { ChangePassword } from "../../services/auth.service";

const Profile = () => {
  const { user } = useAuth();
  const [buttonDisable, setbuttonDisable] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const data = {
    old_password: oldPassword,
    new_password: newPassword,
    new_password_confirmation: newPasswordConfirmation,
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setbuttonDisable(true);

    ChangePassword(data);

    setTimeout(() => {
      setbuttonDisable(false);
    }, 1000);
  };
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
        <form
          method="post"
          className="p-5 md:p-10 bg-white w-full rounded-2xl flex flex-col gap-7 mt-4 mb-10"
        >
          <h2 className="text-center text-[18px] lg:text-[20px]">
            Ubah Password
          </h2>
          <Input
            label="Password lama"
            bgColor="bg-slate-100"
            autoFocus={true}
            type="password"
            placeholder="Masukan password lama anda"
            onchange={(e: any) => setOldPassword(e.target.value)}
            onkeydown={() => {}}
          ></Input>
          <Input
            label="Password baru"
            bgColor="bg-slate-100"
            type="password"
            placeholder="Masukan password baru anda"
            onchange={(e: any) => setNewPassword(e.target.value)}
            onkeydown={() => {}}
          ></Input>
          <Input
            label="Konfirmasi password baru"
            type="password"
            bgColor="bg-slate-100"
            placeholder="Masukan kembali password baru anda"
            onchange={(e: any) => setNewPasswordConfirmation(e.target.value)}
            onkeydown={() => {}}
          ></Input>
          <Button
            type="submit"
            classname="mt-4"
            bg="bg-primary hover:bg-primary/90 text-white"
            onclick={handleChangePassword}
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
