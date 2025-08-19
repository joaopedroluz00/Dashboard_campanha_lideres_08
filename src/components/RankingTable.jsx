import { formatBRL } from "../lib/csv";
import { BASE_POSTITS, GANHA_1_POSTIT_A_CADA } from "../lib/config";

export default function RankingTable({ ranking = [] }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-zinc-900/70 ring-1 ring-white/5">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-900/60 text-left text-zinc-400">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Líder</th>
            <th className="px-4 py-3">Papel</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Vendas</th>
            <th className="px-4 py-3">Ganhou</th>
            <th className="px-4 py-3">Puxados</th>
            <th className="px-4 py-3">Disponíveis</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/80 text-zinc-200">
          {ranking.map((r, idx) => {
            const vendas = r?.vendas || 0;
            const ganhou = Math.min(BASE_POSTITS, Math.floor(vendas / GANHA_1_POSTIT_A_CADA));
            const disp = Math.max(0, ganhou - (r?.puxados || 0));
            return (
              <tr key={r?.seller || idx} className="hover:bg-zinc-900/40 transition-colors">
                <td className="px-4 py-3 font-medium">{idx + 1}</td>
                <td className="px-4 py-3 font-semibold">{r?.seller}</td>
                <td className="px-4 py-3 text-zinc-400">{r?.papel}</td>
                <td className="px-4 py-3 text-zinc-400">{r?.time}</td>
                <td className="px-4 py-3 font-medium text-emerald-400">{formatBRL(vendas)}</td>
                <td className="px-4 py-3">{ganhou}</td>
                <td className="px-4 py-3">{r?.puxados || 0}</td>
                <td className="px-4 py-3">{disp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
