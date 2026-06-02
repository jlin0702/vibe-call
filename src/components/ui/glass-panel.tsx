import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glassPanelVariants = cva(
  "relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "glass",
        light: "glass-light",
        heavy: "glass-heavy",
      },
      glow: {
        none: "",
        cobalt: "glow-cobalt",
        "cobalt-strong": "glow-cobalt-strong",
      },
      rounded: {
        default: "rounded-2xl",
        none: "rounded-none",
        sm: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      glow: "none",
      rounded: "default",
    },
  }
);

export interface GlassPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassPanelVariants> {
  as?: React.ElementType;
}

export function GlassPanel({
  className,
  variant,
  glow,
  rounded,
  as: Component = "div",
  children,
  ...props
}: GlassPanelProps) {
  return (
    <Component
      className={cn(glassPanelVariants({ variant, glow, rounded, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}
