import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { CircleHelp } from "lucide-react"

export interface IHelpProps {
    children?: React.ReactNode
}


const Help = ({ children }: IHelpProps) => {
    if(children === undefined)
        return null
    
    return (
        <Tooltip>
            <TooltipTrigger>
                <CircleHelp size={14} />
            </TooltipTrigger>
            <TooltipContent
                side="right"
                className="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
            >
                {children}
            </TooltipContent>
        </Tooltip>
    )
}

export default Help