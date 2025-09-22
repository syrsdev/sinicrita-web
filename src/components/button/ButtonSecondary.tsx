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
      className="w-full h-12 bg-white cursor-pointer rounded-lg border-2 border-primary shadow-[inset_0px_-2px_0px_1px_#019b98] group hover:bg-primary transition duration-300 ease-in-out disabled:bg-primary disabled:cursor-not-allowed disabled:text-white text-[#333]"
    >
      <span className="font-medium group-hover:text-white px-4 text-sm">
        {children}
      </span>
    </button>
  );
};

export default ButtonSecondary;
