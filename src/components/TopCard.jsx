import { motion } from "framer-motion";
import { BASE_POSTITS, GANHA_1_POSTIT_A_CADA } from "../lib/config";
import { formatBRL } from "../lib/csv";

export default function TopCard({ pos, item }) {
  const iniciais = (item?.seller || "")
    .split(" ").map(s => s[0]).slice(0, 2).join("");
  const ganhou = Math.min(
    BASE_POSTITS,
    Math.floor((item?.vendas || 0) / GANHA_1_POSTIT_A_CADA)
  );
  const disponiveis = Math.max(0, ganhou - (item?.puxados || 0));
  const styles = {
    1: "from-yellow-400 to-amber-500",
    2: "from-slate-200 to-slate-400",
    3: "from-orange-400 to-amber-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-zinc-900/70 p-6 ring-1 ring-white/5 shadow-xl"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${styles[pos]} px-3 py-1 text-xs font-semibold text-black`}>
          {pos}º Lugar
        </span>
        <span className="text-zinc-400 text-xs">{item?.papel} — {item?.time}</span>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-lg font-bold text-zinc-200">
          {iniciais}
        </div>
        <div>
          <p className="text-lg font-semibold text-zinc-50">{item?.seller}</p>
          <p className="text-xs text-zinc-400">Vendas: {formatBRL(item?.vendas || 0)}</p>
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
