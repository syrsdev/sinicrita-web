const ButtonSecondary = ({
  children,
  type = "button",
  //   classname,
  disable,
  onclick,
}: any) => {
  return (
    <button
      disabled={disable}
      onClick={onclick}
      type={type}
      className="w-full h-12 bg-white cursor-pointer rounded-lg border-2 border-primary shadow-[inset_0px_-2px_0px_1px_#019b98] group hover:bg-primary transition duration-300 ease-in-out"
    >
      <span className="font-medium text-[#333] group-hover:text-white">
        {children}
      </span>
    </button>
  );
};

export default ButtonSecondary;
