import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 touch-manipulation active:scale-95";
  
  const variants = {
    primary: "bg-nature-gradient text-nature-cream hover:opacity-90 active:scale-95 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50",
    secondary: "bg-nature-cream text-nature-forest hover:bg-nature-beige active:scale-95 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
    outline: "border-2 border-nature-forest text-nature-forest hover:bg-nature-forest hover:text-nature-cream active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
    danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const sizes = {
    sm: "text-sm px-4 py-2 h-9",
    md: "text-base px-6 py-3 h-11",
    lg: "text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14",
  };

  const disabledStyles = disabled || loading ? "opacity-50 cursor-not-allowed" : "";
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <motion.button 
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${widthStyles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader className="w-5 h-5 animate-spin" />
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      <span className="truncate">{children}</span>
      {!loading && icon && iconPosition === 'right' && icon}
    </motion.button>
  );
}