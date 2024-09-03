import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { KeySquare, LogIn, SquarePower } from "lucide-react"


interface ISidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className }: ISidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            组件
          </h2>
          <div className="space-y-1">
            <Link to="components/button" className="flex px-4 py-2 gap-1 w-full items-center hover:bg-accent hover:text-accent-foreground ">
              <SquarePower size={16} />
              Button
            </Link>
          </div>
          <div className="space-y-1">
            <Link to="components/select" className="flex px-4 py-2 gap-1 w-full items-center hover:bg-accent hover:text-accent-foreground ">
              <SquarePower size={16} />
              Select
            </Link>
          </div>
          <div className="space-y-1">
            <Link to="components/test" className="flex px-4 py-2 gap-1 w-full items-center hover:bg-accent hover:text-accent-foreground ">
              <SquarePower size={16} />
              组件测试
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            认证页面
          </h2>
          <div className="space-y-1">
            <Link to="authentications/login" className="flex px-4 py-2 gap-1 w-full items-center hover:bg-accent hover:text-accent-foreground ">
              <KeySquare size={16} />登录
            </Link>
          </div>
          <div className="space-y-1">
            <Link to="authentications/signup" className="flex px-4 py-2 gap-1 w-full items-center hover:bg-accent hover:text-accent-foreground ">
              <LogIn size={16} />注册
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}