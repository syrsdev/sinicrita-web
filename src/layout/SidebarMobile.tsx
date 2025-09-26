const SidebarMobile = ({ isActive, onclick }: any) => {
  return (
    <>
      {isActive && (
        <div className="w-full flex lg:hidden min-h-screen top-0 absolute left-0 z-100">
          <div
            onClick={onclick}
            className="w-1/5 md:w-1/2 bg-black min-h-screen  top-0 opacity-30"
          ></div>
          <div className="w-4/5 md:w-1/2 bg-white min-h-screen right-0 top-0 text-black px-5">
            <h3 className="my-5">Sinicrita</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarMobile;
