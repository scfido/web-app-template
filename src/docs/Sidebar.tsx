import { cn } from "@/lib/utils"
import { KeySquare, LogIn, SquarePower, TextCursorInput, ContactRound, Palette, FlaskConical } from "lucide-react"
import { NavLink } from "@remix-run/react"



const menuItems = [
  {
    title: "文档",
    items: [
      {
        title: "颜色清单",
        path: "documents/colors",
        icon: <Palette size={16} />
      }
    ]
  },
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
        icon: <FlaskConical size={16} />
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
      },
      {
        title: "动态验证",
        path: "forms/dynamic-validation",
        icon: <TextCursorInput size={16} />
      },
      {
        title: "头像",
        path: "forms/avatar",
        icon: <ContactRound size={16} />
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


interface ISidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const Sidebar = ({ className }: ISidebarProps) => {
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
                <NavLink
                  key={subIndex}
                  to={subItem.path}
                  className={({ isActive }) => cn(
                    "flex px-4 py-2 gap-1 w-full items-center",
                    "hover:bg-accent-hover",
                    { "bg-accent-background text-accent-foreground": isActive }
                  )}
                >
                  {subItem.icon}
                  {subItem.title}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar