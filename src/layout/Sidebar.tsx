interface PropsWithChildren {
  children: React.ReactNode;
  isChat?: boolean;
}

const Sidebar = ({ children, isChat = false }: PropsWithChildren) => {
  return (
    <div
      className={`${
        isChat ? "w-full md:w-2/5 lg:w-1/4" : "hidden w-1/4"
      } lg:flex fixed h-screen border-r-2 border-border bg-main`}
    >
      {children}
    </div>
  );
};

export default Sidebar;
