import { Card, CardContent } from "@/components/ui/card"
import { useTitle } from "ahooks"

const colors = ["gray", "red", "green", "blue", "yellow", "purple", "pink", "orange", "teal", "cyan"]
const variants = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
const DEFAULT = null

function getVariantName(variant?: string | null) {
    if (!variant) {
        return "DEFAULT"
    }
    if (variant === "foreground") {
        return "FG"
    }
    if (variant === "background") {
        return "BG"
    }

    return variant
}

function ColorVariantSquare({ color, variant }: { color: string, variant?: string | null }) {
    return (
        <div className="flex flex-col items-center">
            {variant ? <div className={`w-12 h-9 rounded-md shadow-md bg-${color}-${variant}`}></div>
                : <div className={`w-12 h-9 rounded-md shadow-md bg-${color}`}></div>
            }
            <span className="text-xs mt-1">{getVariantName(variant)}</span>
        </div>
    )
}

function ColorGroupCard({ color, variants }: { color: string, variants?: (string | null)[] }) {
    return (
        <Card className="mb-6">
            <CardContent className="p-4">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold w-24">{color}</h3>
                    <div className="flex-1 grid grid-cols-5 mt-2 sm:grid-cols-10 gap-4">
                        {variants ? variants.map((variant) => (
                            <ColorVariantSquare key={variant} color={color} variant={variant} />
                        )) : (
                            <ColorVariantSquare color={color} />
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function TailwindColorPalette() {
    useTitle("颜色清单")
    return (
        <div className="container mx-auto py-8  not-prose">
            <h1 className="text-3xl font-bold mb-6">颜色清单</h1>
            <div>
                <ColorGroupCard color="border" />
                <ColorGroupCard color="input"  variants={[DEFAULT, "background"]}/>
                <ColorGroupCard color="ring" />
                <ColorGroupCard color="foreground" />
                <ColorGroupCard color="background" variants={[DEFAULT, "1", "2", "3"]} />
                <ColorGroupCard color="primary" variants={[DEFAULT, "foreground"]} />
                <ColorGroupCard color="secondary" variants={[DEFAULT, "foreground"]} />
                <ColorGroupCard color="destructive" variants={[DEFAULT, "foreground"]} />
                <ColorGroupCard color="muted" variants={[DEFAULT, "foreground"]} />
                <ColorGroupCard color="accent" variants={[DEFAULT, "foreground"]} />
                <ColorGroupCard color="popover" variants={[DEFAULT, "foreground"]} />
                <ColorGroupCard color="card" variants={[DEFAULT, "foreground"]} />
                {colors.map((color) => (
                    <ColorGroupCard key={color} color={color} variants={variants} />
                ))}
            </div>
        </div>
    )
}