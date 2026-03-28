import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="inline-flex items-center glass rounded-full p-2 border border-white/10">
      <button
        onClick={decrement}
        disabled={value <= min}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors disabled:opacity-20"
      >
        <Minus size={14} />
      </button>
      <span className="w-12 text-center text-sm font-bold tracking-widest">{value}</span>
      <button
        onClick={increment}
        disabled={value >= max}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors disabled:opacity-20"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
