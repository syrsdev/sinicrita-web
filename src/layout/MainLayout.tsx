import Sidebar from "./Sidebar/Sidebar"

const MainLayout = ({sidebar}: any) => {
  return (
    <div className="flex bg-main">
      <Sidebar>{sidebar}</Sidebar>
      <div className="w-4/5 min-h-screen">
        <div className="w-full bg-primary h-[70px] text-white">s</div>
      </div>
    </div>
  )
}

export default MainLayout