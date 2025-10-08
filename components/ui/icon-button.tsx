import { cn } from "@/lib/utils"; 
import { MouseEventHandler } from "react";

interface IconButtonProps {
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon:React.ReactElement;
  className?:string;
  disabled?: boolean; 
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
  disabled, ariaLabel
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        disabled && "opacity-50 cursor-not-allowed", 
        className
      )}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default IconButton;


