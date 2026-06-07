import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonVariant = "default" | "secondary" | "destructive" | "ghost" | "outline"
type ButtonSize = "default" | "sm" | "lg" | "icon"

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20",
  secondary: "bg-white/10 text-white hover:bg-white/15 border border-white/10",
  destructive: "bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-500/20",
  ghost: "text-slate-400 hover:text-white hover:bg-white/10",
  outline: "border border-white/10 text-white hover:bg-white/5",
}

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3 text-sm",
  lg: "h-12 px-6 text-lg",
  icon: "h-10 w-10",
}

const baseClasses =
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2 focus:ring-offset-[#050510] disabled:opacity-50 disabled:pointer-events-none"

function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
} = {}) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className)
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
)
Button.displayName = "Button"

export { Button, buttonVariants }
