import Loading from "./Loading";

const Button = ({
  children,
  type = "button",
  bg = "bg-secondary",
  classname,
  disable,
  onclick,
}: any) => {
  return (
    <button
      type={type}
      disabled={disable}
      onClick={onclick}
      className={`w-full gap-2 flex justify-center items-center ${bg} py-2 px-3 rounded-lg ${
        disable ? "cursor-not-allowed" : "cursor-pointer"
      } ${classname}`}
    >
      {disable ? <Loading /> : children}
    </button>
  );
};

export default Button;
