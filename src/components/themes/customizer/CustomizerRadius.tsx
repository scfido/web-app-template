import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { useThemeConfigStore } from "../themeConfigStore";

const RadiusSection: React.FC = () => {
	const setConfig = useThemeConfigStore((state) => state.setConfig);
	const cssVars = useThemeConfigStore((state) => state.cssVars);

	const setRadius = (value: string) => {
		setConfig({
			cssVars: {
				...cssVars,
				light: {
					...cssVars.light,
					radius: parseFloat(value),
				},
			},
		});
	};

	return (
		<div className="space-y-1.5">
			<Label className="text-xs">圆角</Label>
			<div className="grid grid-cols-5 gap-2">
				{["0", "0.3", "0.5", "0.75", "1.0"].map((value) => {
					return (
						<Button
							variant="outline"
							size="sm"
							key={value}
							onClick={() => {
								setRadius(value);
							}}
							className={cn(
								cssVars.light?.radius === parseFloat(value) &&
								"border-2 border-primary",
								"flex flex-col sm:flex-row gap-2 items-center justify-center",
								"h-16 sm:h-10"
							)}
						>
							<i
								style={{
									borderTopLeftRadius: `${value}rem`,
								}}
								className={cn(
									"w-6 h-6 min-w-6 bg-primary/20",
									"border-l-2 border-t-2 border-primary/70",
									{
										grayscale:
											cssVars.light?.radius !== parseFloat(value),
									},
								)}
							/>
							<span>{value}</span>
						</Button>
					);
				})}
			</div>
		</div>
	);
};

export default RadiusSection;
