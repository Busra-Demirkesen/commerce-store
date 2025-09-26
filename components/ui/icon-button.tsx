import { cn } from "@/lib/utils"; // Eğer `cn` fonksiyonu varsa
import { MouseEventHandler } from "react";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon:React.ReactElement;
  className?:string;
  disabled?: boolean; // disabled prop'unu ekliyoruz
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
  disabled // disabled prop'unu alıyoruz
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        disabled && "opacity-50 cursor-not-allowed", // disabled olduğunda stil ekliyoruz
        className
      )}
      disabled={disabled} // disabled prop'unu button elementine iletiyoruz
    >
      {icon}
    </button>
  );
};

export default IconButton;
