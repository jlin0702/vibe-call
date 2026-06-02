import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-semibold",
  {
    variants: {
      variant: {
        online: "bg-status-online/20 text-status-online",
        notification: "bg-status-dnd text-white border-[1.5px] border-surface-darkest",
        dot: "bg-cobalt-glow",
      },
      size: {
        default: "px-1.5 py-1 rounded text-[10px]",
        notification: "min-w-[16px] h-[16px] rounded-full text-[9px] px-1",
        dot: "w-2 h-2 rounded-full",
      },
      position: {
        static: "",
        "top-right": "absolute -top-0.5 -right-0.5",
      },
    },
    defaultVariants: {
      variant: "online",
      size: "default",
      position: "static",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  className,
  variant,
  size,
  position,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, position, className }))}
      {...props}
    />
  );
}
