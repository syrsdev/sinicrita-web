import Sidebar from "./Sidebar";

const MainLayout = ({ sidebar, children, title }: any) => {
  return (
    <div className="flex ">
      <Sidebar>{sidebar}</Sidebar>
      <div className="w-3/4 ml-[25%] overflow-y-auto">
        <div className="w-3/4 bg-primary h-[70px] text-[20px] text-white fixed top-0 z-10 flex justify-center font-bold items-center">
          {title}
        </div>
        <p className="mt-[70px]">{children}</p>
      </div>
    </div>
  );
};

export default MainLayout;
