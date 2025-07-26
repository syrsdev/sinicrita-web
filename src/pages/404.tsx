import MainSidebar from "../components/sidebar/MainSidebar";
import useAuth from "../hooks/useAuth";
import MainLayout from "../layout/MainLayout";

const NotFound = () => {
  const { user } = useAuth();

  return (
    <MainLayout sidebar={<MainSidebar />} userLogin={user}>
      not found.
    </MainLayout>
  );
};

export default NotFound;
