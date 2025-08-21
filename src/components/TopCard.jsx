// src/components/TopCard.jsx
import { motion } from "framer-motion";
import Avatar from "./Avatar";
import { BASE_POSTITS, GANHA_1_POSTIT_A_CADA } from "../lib/config";
import { formatBRL } from "../lib/csv";

export default function TopCard({ pos, item }) {
  const ganhou = Math.min(
    BASE_POSTITS,
    Math.floor((item?.vendas || 0) / GANHA_1_POSTIT_A_CADA)
  );
  const disponiveis = Math.max(0, ganhou - (item?.puxados || 0));

  const medalClasses = {
    1: "from-yellow-300 to-amber-500",
    2: "from-slate-200 to-slate-400",
    3: "from-orange-400 to-amber-600",
  }[pos] ?? "from-zinc-700 to-zinc-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-zinc-900/70 p-6 ring-1 ring-white/5 shadow-xl"
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded-full bg-gradient-to-r ${medalClasses} px-3 py-1 text-xs font-semibold text-black`}
        >
          {pos}º Lugar
        </span>
        <span className="text-zinc-400 text-xs">
          {item?.papel} — {item?.time}
        </span>
      </div>

      {/* <- AQUI: avatar com flex-none para padronizar alinhamento */}
      <div className="mb-4 flex items-center gap-3">
        <Avatar name={item?.seller} size={48} className="flex-none" />
        <div>
          <p className="text-lg font-semibold text-zinc-50">{item?.seller}</p>
          <p className="text-xs text-zinc-400">
            Vendas: {formatBRL(item?.vendas || 0)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-zinc-400">Ganhou</p>
          <p className="text-base font-semibold text-zinc-50">{ganhou}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-400">Puxados</p>
          <p className="text-base font-semibold text-zinc-50">{item?.puxados || 0}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-400">Disponíveis</p>
          <p className="text-base font-semibold text-zinc-50">{disponiveis}</p>
        </div>
      </div>
    </motion.div>
  );
}