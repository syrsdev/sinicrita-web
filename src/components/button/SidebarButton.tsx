const SidebarButton = ({ onclick, checked }: any) => {
  return (
    <label className="z-[150] relative">
      <div className="lg:hidden w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
        <input
          className="hidden peer"
          type="checkbox"
          checked={checked}
          onChange={onclick}
        />
        <div className="w-[50%] h-[2px] bg-white rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg] peer-checked:bg-black"></div>
        <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
        <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg] peer-checked:bg-black"></div>
      </div>
    </label>
  );
};

export default SidebarButton;
