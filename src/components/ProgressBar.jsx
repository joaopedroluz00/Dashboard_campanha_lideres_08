import { motion } from "framer-motion";

export default function ProgressBar({ value = 0 }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="w-full rounded-full bg-zinc-800 p-1">
      <motion.div
        className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}