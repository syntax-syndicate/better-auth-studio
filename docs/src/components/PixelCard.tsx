import { ReactNode } from "react";

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'code' | 'highlight';
}

export default function PixelCard({ children, className = '', variant = 'default' }: PixelCardProps) {
  const baseClasses = "border border-white/20 bg-black/50 backdrop-blur-sm";
  
  const variantClasses = {
    default: "p-6 rounded-none",
    code: "p-4 rounded-none bg-black border-white/30 overflow-hidden",
    highlight: "p-6 rounded-none border-white/40 bg-white/5"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
