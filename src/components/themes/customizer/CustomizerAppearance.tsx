import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SunIcon } from "@radix-ui/react-icons";
import { MoonIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAppearance } from "../AppearanceContext";

const AppearanceSection: React.FC = () => {
  const {appearance, setAppearance} = useAppearance();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">外观</Label>
      <div className="grid grid-cols-3 gap-2">
        {mounted ? (
          <>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => setAppearance("light")}
              className={cn(appearance === "light" && "border-2 border-primary")}
            >
              <SunIcon className="mr-1 -translate-x-1" />
              Light
            </Button>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => setAppearance("dark")}
              className={cn(appearance === "dark" && "border-2 border-primary")}
            >
              <MoonIcon className="mr-1 -translate-x-1" />
              Dark
            </Button>
          </>
        ) : (
          <>
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
          </>
        )}
      </div>
    </div>
  );
};

export default AppearanceSection;
