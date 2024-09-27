import { Button, ButtonProps } from "@/components/ui/button";
import { useRemixFormContext } from "remix-hook-form";

interface ISubmitButtonProps extends ButtonProps {
    submittingContent?: React.ReactNode;
}

const SubmitButton = ({
  children,
  submittingContent = "提交中...",
  ...props
}: ISubmitButtonProps) => {
  const { formState: { isSubmitting } } = useRemixFormContext();
  return <Button disabled={isSubmitting} {...props} type="submit" >{isSubmitting ? submittingContent : children}</Button>;
};

export default SubmitButton;
