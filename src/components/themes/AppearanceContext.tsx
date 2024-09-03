import { createContext, useContext, useEffect, useState } from "react"


type AppearanceType = "dark" | "light" | "system"

interface IAppearanceProviderState {
  appearance: AppearanceType
  setAppearance: (appearance: AppearanceType) => void
}

const initialState: IAppearanceProviderState = {
  appearance: "system",
  setAppearance: () => null,
}

const AppearanceProviderContext = createContext<IAppearanceProviderState>(initialState)

export interface IAppearanceProviderProps {
  children: React.ReactNode
  defaultAppearance?: AppearanceType
  storageKey?: string
}

export function AppearanceProvider({
  children,
  defaultAppearance = "system",
  storageKey = "system-ui-appearance",
  ...props
}: IAppearanceProviderProps) {
  const [appearance, setAppearance] = useState<AppearanceType>(
    () => (localStorage.getItem(storageKey) as AppearanceType) || defaultAppearance
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (appearance === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(appearance)
  }, [appearance])

  const value = {
    appearance,
    setAppearance: (appearance: AppearanceType) => {
      localStorage.setItem(storageKey, appearance)
      setAppearance(appearance)
    },
  }

  return (
    <AppearanceProviderContext.Provider {...props} value={value}>
      {children}
    </AppearanceProviderContext.Provider>
  )
}

export const useAppearance = () => {
  const context = useContext(AppearanceProviderContext)

  if (context === undefined)
    throw new Error("useAppearance must be used within a AppearanceProvider")

  return context
}
