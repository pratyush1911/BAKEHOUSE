import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-white text-onyx hover:bg-gold-premium',
  secondary: 'glass text-white hover:bg-white/10',
  outline: 'border border-white/10 text-white hover:bg-white/5',
  ghost: 'text-white/40 hover:text-white',
  danger: 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white',
};

const sizes = {
  sm: 'px-6 py-3 text-[10px]',
  md: 'px-10 py-5 text-xs',
  lg: 'px-12 py-6 text-sm',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const baseStyles = `
    inline-flex items-center justify-center gap-3
    font-bold tracking-widest uppercase rounded-full
    transition-all duration-500
    disabled:opacity-20 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <motion.button
      type={type}
      className={baseStyles}
      disabled={disabled || loading}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {leftIcon && !loading && <span className="">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="">{rightIcon}</span>}
    </motion.button>
  );
}
