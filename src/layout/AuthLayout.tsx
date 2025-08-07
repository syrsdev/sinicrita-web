import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const AuthLayout = ({ children, onsubmit }: any) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center text-white bg-gradient-to-bl from-primary via-35% via-tertiary to-white flex-col gap-5 py-10">
      <Link to="/">
        <img src="./assets/logo-sinicrita.svg" alt="sinicrita" />
      </Link>
      <div className="w-full flex justify-center">
        <Tooltip id="showhidepw" className="z-50" />
        <form
          onSubmit={onsubmit}
          className="flex bg-primary p-7 md:p-10 rounded-2xl gap-7 w-10/12 md:w-1/2 lg:w-1/3 flex-col"
          method="post"
        >
          {children}
        </form>
      </div>
    </div>
  );
};

export default AuthLayout;
