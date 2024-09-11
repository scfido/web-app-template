import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppearance } from "@/components/themes/AppearanceContext"

export function AppearanceToggle() {
  const { appearance, setAppearance } = useAppearance()

  return (
    <Button variant="outline" size="icon" onClick={() => setAppearance(appearance === 'light' ? 'dark' : 'light')}>
      <Sun className="text-gray-600 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">外观</span>
    </Button>
  )
}
