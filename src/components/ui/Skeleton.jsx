import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
      <div className="h-48 bg-brown-100 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-brown-100 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-brown-100 rounded w-1/2 animate-pulse" />
        <div className="flex justify-between items-center">
          <div className="h-5 bg-brown-100 rounded w-20 animate-pulse" />
          <div className="h-10 bg-brown-100 rounded-full w-10 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
          className="h-4 bg-brown-100 rounded"
        />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="h-[600px] bg-brown-100 animate-pulse rounded-b-3xl" />
  );
}
