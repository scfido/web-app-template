import { themes } from "../themes";
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTheme } from "../ThemeProvider";

const ColorSection: React.FC = () => {
	const [mounted, setMounted] = React.useState(false);
	const {
		themeName,
		setThemeName,
		appearance,
	} = useTheme();

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="space-y-1.5">
			<Label className="text-xs">主题</Label>
			<div className="grid grid-cols-3 gap-2">
				{themes.map((theme) => {
					const isActive = themeName === theme.name;

					return mounted ? (
						<Button
							variant={"outline"}
							size="sm"
							key={theme.name}
							onClick={() => setThemeName(theme.name)}
							className={cn(
								"justify-start",
								isActive && "border-2 border-primary",
							)}
							style={
								{
									"--theme-primary": `hsl(${theme?.cssVars[appearance === "dark" ? "dark" : "light"].primary})`,
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
