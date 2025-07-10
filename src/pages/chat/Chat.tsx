import MainLayout from "../../layout/MainLayout";
import useAuth from "../../hooks/useAuth";
import SidebarChat from "../../components/sidebar/SidebarChat";

const Chat = () => {
  const { user } = useAuth();

  return (
    <MainLayout
      sidebar={<SidebarChat />}
      userLogin={user}
      hiddenAddButton={true}
    ></MainLayout>
  );
};

export default Chat;
