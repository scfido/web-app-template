import { themes } from "../themes";
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useThemeConfigStore } from "../themeConfigStore";
import { useAppearance } from "../AppearanceContext";

const ColorSection: React.FC = () => {
	const  setConfig = useThemeConfigStore(state => state.setConfig);
	const configTheme = useThemeConfigStore(state => state.theme);
	const cssVars = useThemeConfigStore(state => state.cssVars);
	const [mounted, setMounted] = React.useState(false);
	const { appearance } = useAppearance();

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="space-y-1.5">
			<Label className="text-xs">颜色</Label>
			<div className="grid grid-cols-3 gap-2">
				{themes.map((theme) => {
					const isActive = configTheme === theme.name;

					return mounted ? (
						<Button
							variant={"outline"}
							size="sm"
							key={theme.name}
							onClick={() => {
								const { radius } = cssVars.light;

								setConfig({
									theme: theme.name,
									cssVars: {
										...theme.cssVars,
										light: {
											...theme.cssVars.light,
											radius,
										},
										dark: {
											...theme.cssVars.dark,
											radius,
										},
									},
								});
							}}
							className={cn(
								"justify-start",
								isActive && "border-2 border-primary",
							)}
							style={
								{
									"--theme-primary": `hsl(${
										theme?.activeColor[appearance === "dark" ? "dark" : "light"]
									})`,
								} as React.CSSProperties
							}
						>
							<span
								className={cn(
									"mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]",
								)}
							>
								{isActive && <CheckIcon className="w-4 h-4 text-white" />}
							</span>
							{theme.label}
						</Button>
					) : (
						<Skeleton className="w-full h-8" key={theme.name} />
					);
				})}
			</div>
		</div>
	);
};

export default ColorSection;
