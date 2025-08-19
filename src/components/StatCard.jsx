import { motion } from 'framer-motion'

export default function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 rounded-2xl bg-zinc-900/70 p-5 shadow-lg ring-1 ring-white/5 backdrop-blur"
    >
      <div className="rounded-xl bg-zinc-800/80 p-3">
        <Icon className="h-6 w-6 text-zinc-200" />
      </div>
      <div>
        <p className="text-sm text-zinc-400">{label}</p>
        <p className="text-2xl font-semibold text-zinc-50">{value}</p>
        {sub && <p className="text-xs text-zinc-400 mt-1">{sub}</p>}
      </div>
    </motion.div>
  )
}
