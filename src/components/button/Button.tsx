import Loading from "../loading/Loading";

const Button = ({
  children,
  type = "button",
  bg = "bg-secondary hover:bg-[#31D5D3FF]",
  classname,
  disable,
  onclick,
  rounded = "rounded-lg",
}: any) => {
  return (
    <button
      type={type}
      disabled={disable}
      onClick={onclick}
      className={`w-full gap-2 flex justify-center items-center ${bg} py-2 px-3 ${rounded} ${
        disable ? "cursor-not-allowed" : "cursor-pointer"
      } ${classname}`}
    >
      {disable ? <Loading /> : children}
    </button>
  );
};

export default Button;
