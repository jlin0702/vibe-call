import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundOrbsProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function BackgroundOrbs({ className, as: Component = "div", ...props }: BackgroundOrbsProps) {
  return (
    <Component 
      aria-hidden="true"
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
      {...props}
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cobalt/8 blur-3xl animate-float" />
      <div className="absolute -bottom-48 -left-24 w-80 h-80 rounded-full bg-cobalt-deep/10 blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cobalt-glow/5 blur-3xl animate-float-slow" />
    </Component>
  );
}
