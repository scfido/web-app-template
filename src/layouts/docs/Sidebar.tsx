import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { SquarePower } from "lucide-react"


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
            <Link to="button" className="flex px-4 py-2 gap-1 w-full items-center hover:bg-accent hover:text-accent-foreground ">
              <SquarePower size={16} />
              按钮
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}