import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppearance } from "@/components/themes/AppearanceContext"

export function AppearanceToggle() {
  const { setAppearance } = useAppearance()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="text-gray-600 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">外观</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setAppearance("light")}>
          浅色
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAppearance("dark")}>
          深色
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAppearance("system")}>
          自动
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
