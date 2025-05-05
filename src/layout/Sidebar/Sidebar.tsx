import { PropsWithChildren } from "react"

const Sidebar = ({children}: PropsWithChildren) => {
  return (
    <div className="w-1/5 min-h-screen border-r-2 border-border">{children}</div>
  )
}

export default Sidebar