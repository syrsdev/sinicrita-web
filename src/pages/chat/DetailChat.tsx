import MainLayout from "../../layout/MainLayout";
import useAuth from "../../hooks/useAuth";
import SidebarChat from "../../components/sidebar/SidebarChat";
import { Link } from "react-router-dom";

const DetailChat = () => {
  const { user } = useAuth();

  return <p>details</p>;
};

export default DetailChat;
