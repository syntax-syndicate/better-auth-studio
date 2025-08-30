import * as React from "react"
import { ChevronDown } from "lucide-react"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={`flex h-10 w-full border border-dashed border-white/20 bg-black/30 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white/40 disabled:cursor-not-allowed disabled:opacity-50 rounded-none appearance-none pr-8 ${className}`}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = "Select"

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`border border-dashed border-white/20 bg-black/30 rounded-none ${className}`}
      {...props}
    />
  )
)
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ className, ...props }, ref) => (
    <option
      ref={ref}
      className={`px-3 py-2 text-sm text-white hover:bg-white/10 ${className}`}
      {...props}
    />
  )
)
SelectItem.displayName = "SelectItem"

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={`flex h-10 w-full border border-dashed border-white/20 bg-black/30 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white/40 disabled:cursor-not-allowed disabled:opacity-50 rounded-none ${className}`}
      {...props}
    >
      {children}
    </button>
  )
)
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={`text-sm text-white ${className}`}
      {...props}
    />
  )
)
SelectValue.displayName = "SelectValue"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
