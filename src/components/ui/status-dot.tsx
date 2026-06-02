import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusDotVariants = cva(
  "absolute -bottom-0.5 -right-0.5 rounded-full border-2",
  {
    variants: {
      status: {
        online: "bg-status-online",
        idle: "bg-status-idle",
        dnd: "bg-status-dnd",
        offline: "bg-status-offline",
      },
      size: {
        sm: "w-2.5 h-2.5",
        md: "w-3 h-3",
      },
      borderContext: {
        dark: "border-surface-dark",
        darkest: "border-surface-darkest",
      },
    },
    defaultVariants: {
      status: "online",
      size: "sm",
      borderContext: "darkest",
    },
  }
);

export interface StatusDotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusDotVariants> {}

export function StatusDot({
  className,
  status,
  size,
  borderContext,
  ...props
}: StatusDotProps) {
  return (
    <span
      className={cn(statusDotVariants({ status, size, borderContext, className }))}
      {...props}
    />
  );
}
