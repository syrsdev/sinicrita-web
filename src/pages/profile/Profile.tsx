import MainSidebar from "../../components/sidebar/MainSidebar";
import useAuth from "../../hooks/useAuth";
import MainLayout from "../../layout/MainLayout";

const Profile = () => {
  const { user } = useAuth();

  return (
    <MainLayout sidebar={<MainSidebar />} userLogin={user}>
      <h1>tes</h1>
    </MainLayout>
  );
};

export default Profile;
