import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Input as ShadcnInput } from "@/components/ui/input"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { cn } from "@/lib/utils"
import { useRemixFormContext } from "remix-hook-form"
import { FormMessage, useBeringFormContext } from "@/components/forms/BeringForm"
import { IFormItemProps } from "./types"
import Help from "./_Help"
import { DragEventHandler, useEffect, useRef, useState } from "react"
import { Upload } from "lucide-react"
import 'react-photo-view/dist/react-photo-view.css';

interface IImagePreviewProps {
    src?: string
    onUpload?: () => void
}

const ImagePreview = ({ src, onUpload }: IImagePreviewProps) => {

    const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
        e.preventDefault()
        onUpload?.()
    }

    return (
        <PhotoProvider>
            <div onClick={e => e.preventDefault()}>
                {src ?
                    <PhotoView src={src}>
                        <img className="p-0.5 w-16 h-16 rounded-md bg-background" src={src} />
                    </PhotoView>
                    : <Upload className="w-8 h-8 text-muted-foreground cursor-pointer" onClick={handleClick} />
                }
            </div>
        </PhotoProvider>
    )
}

export interface IAvatarFormItemProps extends Omit<IFormItemProps, "placeholder"> {
    defaultValue?: string
    allowedFileTypes?: string[] // 允许的文件类型
}

const getFileExt = (file: File) => {
    return file.name.split('.').pop()?.toLowerCase()
}

const AvatarFormItem = ({
    name,
    label,
    className,
    description,
    defaultValue,
    allowedFileTypes = ["jpg", "jpeg", "png", "svg"],
    help,
    disabled = false,
}: IAvatarFormItemProps) => {
    const { control, watch, setValue } = useRemixFormContext()
    const { formSchema } = useBeringFormContext()
    const isRequired = !formSchema.shape[name]?.isOptional() // 判断字段是否必填
    const [image, setImage] = useState<string | undefined>(defaultValue);
    const [dragging, setDragging] = useState(false);
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        const { unsubscribe } = watch((formData, { name: triggerName }) => {
            if (triggerName === name) {
                const file = formData[name]

                if (typeof file === "string")   //忽略表单回填的字符串值
                    return;

                if (typeof file === "object")
                    previewFile(file)
            }
        })

        return unsubscribe
    }, [watch, name])

    const isValidFile = (file?: File | null) => {
        if (!file)
            return false

        return allowedFileTypes?.map(ext => ext.toLowerCase())
            .includes(getFileExt(file) ?? "")
    }

    const previewFile = (file?: File) => {
        if (!file)
            return

        // 读取上传选中的图片，显示在页面上
        // 如果文件时图片才显示
        if (isValidFile(file)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    // @ts-ignore ts(2345) 不知道如何解决这个警告
                    setImage(e.target?.result)
                }
            }
            reader.onerror = () => {
                setImage(undefined)
            }

            reader.readAsDataURL(file)
        } else {
            setImage(undefined)
        }
    }


    const handleDragIn: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
            const file = e.dataTransfer.items[0]

            const accept = file.kind === 'file' && file.type.startsWith("image")
            setAccepted(accept)
            setDragging(true);
        };
    }

    const handleDragOut: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
    };

    const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setDragging(false);
        if (accepted) {
            const files = e.dataTransfer?.files;
            if (files && files.length > 0) {
                setValue(name, files[0], {
                    shouldValidate: true,
                    shouldDirty: true,
                })
            }
        }
    };

    const uploadRef = useRef<HTMLInputElement>(null);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled)
            return

        if (e.key === "Enter" || e.key === " ") {
            uploadRef.current?.click()
        }
    }

    const handleUpload = () => {
        uploadRef.current?.click()
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { onBlur, onChange } }) => (
                <FormItem className={className}>
                    <FormLabel className={cn("flex gap-1", { "after:content-['*'] after:text-red-400": isRequired })}>
                        {label ?? name}
                        <Help>{help}</Help>
                    </FormLabel>
                    <FormControl>
                        <FormItem>
                            <FormLabel>
                                <div
                                    className={cn("flex relative items-center gap-x-3 rounded-md bg-input-background border border-input ring-offset-background",
                                        "disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer",
                                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                        )}
                                    tabIndex={0}
                                    onDragEnter={handleDragIn}
                                    onDragLeave={handleDragOut}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    onKeyDown={handleKeyDown}
                                >
                                    <div className={cn("flex items-center justify-center w-16 h-16 ")}>
                                        <ImagePreview src={image ?? defaultValue} onUpload={handleUpload} />
                                    </div>
                                    <p className={cn("flex flex-col gap-1 text-foreground font-normal", { "invisible": dragging })}>
                                        <span className="text-sm ">上传或拖动文件到这里</span>
                                        <span className="text-xs text-muted-foreground">接受<code className="bg-muted text-muted-foreground px-1 py-0.5 rounded">{allowedFileTypes?.join(", ")}</code>文件</span>
                                    </p>
                                    <div
                                        className={cn(
                                            "justify-center items-center absolute text-sm pointer-events-none",
                                            "-inset-0 border border-dashed bg-opacity-90 rounded",
                                            dragging ? "flex" : "hidden",
                                            accepted ? "border-primary bg-primary/30" : "border-red-600 bg-red-100",
                                        )}
                                    >
                                        <div className="pointer-events-none text-foreground">{accepted ? "请释放鼠标" : "只支持图片文件"}</div>
                                    </div>
                                </div>
                            </FormLabel>
                            <FormControl>
                                <input
                                    ref={uploadRef}
                                    type="file"
                                    className="sr-only"
                                    disabled={disabled}
                                    onBlur={onBlur}
                                    onChange={(e) => {
                                        // 使用react-hook-form的Controller封装的input，需要使用onChange(e.target.files[0])
                                        if (e.target.files && e.target.files.length > 0) {
                                            onChange(e.target.files[0])
                                        }
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    </FormControl>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default AvatarFormItem
