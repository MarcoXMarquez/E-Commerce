import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: LucideIcon
  iconPosition?: "left" | "right"
  children: ReactNode
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      children,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 shadow-sm hover:shadow-md",
      secondary:
        "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500 shadow-sm hover:shadow-md",
      ghost:
        "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-4 py-2 text-base gap-2",
      lg: "px-6 py-3 text-lg gap-2.5",
    }

    const iconSizes = {
      sm: 16,
      md: 18,
      lg: 20,
    }

    if (asChild) {
      return (
        <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
          {Icon && iconPosition === "left" && <Icon size={iconSizes[size]} />}
          {children}
          {Icon && iconPosition === "right" && <Icon size={iconSizes[size]} />}
        </span>
      )
    }

    return (
      <button className={cn(baseStyles, variants[variant], sizes[size], className)} ref={ref} {...props}>
        {Icon && iconPosition === "left" && <Icon size={iconSizes[size]} />}
        {children}
        {Icon && iconPosition === "right" && <Icon size={iconSizes[size]} />}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button }
