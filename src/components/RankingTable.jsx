// src/components/RankingTable.jsx
import React from "react";
import Avatar from "./Avatar";
import { BASE_POSTITS, GANHA_1_POSTIT_A_CADA } from "../lib/config";
import { formatBRL } from "../lib/csv";

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
          {ranking.map((row, idx) => {
            const ganhou = Math.min(
              BASE_POSTITS,
              Math.floor((row.vendas || 0) / GANHA_1_POSTIT_A_CADA)
            );
            const disp = Math.max(0, ganhou - (row.puxados || 0));

            return (
              <tr
                key={row.seller}
                className="hover:bg-zinc-900/40 transition-colors"
              >
                <td className="px-4 py-3 font-medium">{idx + 1}</td>

                <td className="px-4 py-3 font-semibold">
                  <div className="flex items-center gap-2">
                    {/* <- AQUI: avatar com flex-none para padronizar alinhamento */}
                    <Avatar name={row.seller} size={28} className="flex-none" />
                    <span>{row.seller}</span>
                  </div>
                </td>

                <td className="px-4 py-3 text-zinc-400">{row.papel}</td>
                <td className="px-4 py-3 text-zinc-400">{row.time}</td>
                <td className="px-4 py-3 font-medium text-emerald-400">
                  {formatBRL(row.vendas)}
                </td>
                <td className="px-4 py-3">{ganhou}</td>
                <td className="px-4 py-3">{row.puxados || 0}</td>
                <td className="px-4 py-3">{disp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
