import { Link } from "react-router-dom";
import MainSidebar from "../components/sidebar/MainSidebar";
import useAuth from "../hooks/useAuth";
import MainLayout from "../layout/MainLayout";

const NotFound = () => {
  const { user } = useAuth();

  return (
    <MainLayout sidebar={<MainSidebar />} userLogin={user}>
      <div className="flex flex-col justify-center items-center w-full gap-5 py-10">
        <img src="./assets/404.svg" alt="not found" width="30%" />
        <span className="text-xl">
          Page not found.
          <Link
            to={user == null ? "/" : "/post"}
            className="text-primary hover:text-secondary"
          >
            {" "}
            go back
          </Link>
        </span>
      </div>
    </MainLayout>
  );
};

export default NotFound;
