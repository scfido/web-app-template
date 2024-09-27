import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "../ThemeProvider";

const CustomizerHeader: React.FC = () => {
  const { resetThemeCssVars } = useTheme();

  const resetConfig = () => {
    resetThemeCssVars();
  };

  return (
    <div className="flex items-start">
      <div className="pr-2 space-y-1">
        <div className="font-semibold leading-none tracking-tight">
          主题定制
        </div>
        <div className="text-xs text-muted-foreground">
          选择样式和颜色
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto rounded-[0.5rem]"
            onClick={resetConfig}
          >
            <Undo2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="center"
          className="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
        >
          重置
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default CustomizerHeader;
