import * as React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        {...props}
        className={cn(
          `
          w-auto 
          rounded-full
          bg-black
          px-4
          py-2
          text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
          font-semibold
          hover:opacity-75
          transition
          `,
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
