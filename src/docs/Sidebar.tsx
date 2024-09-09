import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { KeySquare, LogIn, SquarePower, TextCursorInput } from "lucide-react"


interface ISidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const menuItems = [
  {
    title: "组件",
    items: [
      {
        title: "Button",
        path: "components/button",
        icon: <SquarePower size={16} />
      },
      {
        title: "Select",
        path: "components/select",
        icon: <SquarePower size={16} />
      },
      {
        title: "Combobox",
        path: "components/combobox",
        icon: <SquarePower size={16} />
      },
      {
        title: "组件测试",
        path: "components/test",
        icon: <SquarePower size={16} />
      }
    ]
  },
  {
    title: "表单",
    items: [
      {
        title: "常规",
        path: "forms/normal",
        icon: <TextCursorInput size={16} />
      }
    ]
  },
  {
    title: "认证页面",
    items: [
      {
        title: "登录",
        path: "authentications/login",
        icon: <KeySquare size={16} />
      },
      {
        title: "注册",
        path: "authentications/signup",
        icon: <LogIn size={16} />
      }
    ]
  }
]

export function Sidebar({ className }: ISidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {menuItems.map((item, index) => (
          <div key={index} className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {item.title}
            </h2>
            <div className="space-y-1">
              {item.items.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  to={subItem.path}
                  className="flex px-4 py-2 gap-1 w-full items-center hover:bg-accent hover:text-accent-foreground "
                >
                  {subItem.icon}
                  {subItem.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}