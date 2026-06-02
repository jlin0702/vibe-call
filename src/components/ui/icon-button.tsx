import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-glow",
  {
    variants: {
      variant: {
        ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-light/50",
        ghostMuted: "text-text-muted hover:text-text-secondary hover:bg-surface-light/40",
        glass: "glass-light text-text-primary hover:bg-surface-lighter/70",
        dnd: "bg-status-dnd/20 text-status-dnd hover:bg-status-dnd/30",
        cobalt: "bg-cobalt/15 text-cobalt-glow ring-1 ring-cobalt/40 glow-cobalt",
        destructive: "bg-status-dnd hover:bg-red-600 text-white shadow-lg shadow-red-500/20",
        add: "text-status-online/70 hover:text-status-online hover:bg-status-online/10",
      },
      size: {
        sm: "p-1.5 rounded",
        md: "p-2 rounded-lg",
        lg: "w-11 h-11 rounded-full",
        dock: "w-10 h-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";
