import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-zinc-900/70 p-5 shadow-lg ring-1 ring-white/5 backdrop-blur"
    >
      <div className="flex items-center gap-4">
        {Icon && <Icon className="h-6 w-6 text-zinc-200" />}
        <div className="flex-1">
          <p className="text-sm text-zinc-400">{label}</p>
          <p className="text-2xl font-semibold text-zinc-50">{value}</p>

          {sub && (
            typeof sub === "string"
              ? <p className="mt-1 text-xs text-zinc-400">{sub}</p>
              : <div className="mt-2">{sub}</div>  /* << NADA de <p> aqui */
          )}
        </div>
      </div>
    </motion.div>
  );
}