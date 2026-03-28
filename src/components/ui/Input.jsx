import { forwardRef } from 'react';

const Input = forwardRef(function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  type = 'text',
  className = '',
  ...props
}, ref) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-[10px] tracking-widest uppercase font-bold opacity-30 mb-3">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-30">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            w-full bg-white/5 border border-white/10 rounded-2xl py-5 text-sm transition-all focus:outline-none focus:border-gold-premium focus:bg-white/10
            ${leftIcon ? 'pl-14' : 'pl-6'}
            ${rightIcon ? 'pr-14' : 'pr-6'}
            ${error ? 'border-red-500/50 focus:border-red-500' : ''}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-30">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-[10px] uppercase tracking-widest font-bold text-red-500/60">{error}</p>
      )}
    </div>
  );
});

export default Input;
