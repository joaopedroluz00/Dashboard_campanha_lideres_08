import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Users, RefreshCw, Medal, AlertTriangle, Maximize } from "lucide-react";

import ProgressBar from "./components/ProgressBar";
import StatCard from "./components/StatCard";
import TopCard from "./components/TopCard.jsx";
import RankingTable from "./components/RankingTable";

import {
  META_GLOBAL,
  VALOR_POSTIT,
  DEADLINE_DATE,
  REFRESH_MS,
  GANHA_1_POSTIT_A_CADA,
  BASE_POSTITS,
  PARTICIPANTES,
} from "./lib/config";
import { formatBRL } from "./lib/csv";
import { fetchSheetSafe, groupSales } from "./lib/sheet";

export default function App() {
  const [data, setData] = useState({
    ranking: PARTICIPANTES.map((p) => ({ ...p, seller: p.nome, vendas: 0, puxados: 0 })),
    total: 0,
    puxadosTotal: 0,
  });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchSheetSafe();

      if (result.error) {
        setError(result.error);
      } else {
        const processed = groupSales(result.data);
        if (processed.error) setError(processed.error);
        else { setData(processed.data); setError(""); }
      }
      setLastUpdated(new Date());
      setLoading(false);
    };

    loadData();
    const intervalId = setInterval(loadData, REFRESH_MS);
    return () => clearInterval(intervalId);
  }, []);

  const { ranking, total, puxadosTotal } = data;
  const pctMeta = total > 0 ? Math.min(100, (total / META_GLOBAL) * 100) : 0;
  const campeao = ranking[0];

  const openFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();
    else alert("O navegador da sua TV não suporta a tela cheia. Tente usar a opção manual do controle remoto.");
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] p-4 md:p-6 text-zinc-100 font-sans">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              <Medal className="h-7 w-7 text-amber-400" /> LÍDERES da Semana
            </h1>
            <p className="text-zinc-400 text-sm">Vigência até {DEADLINE_DATE} • Meta: {formatBRL(META_GLOBAL)}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400 border border-zinc-700 bg-zinc-800/50 rounded-full px-3 py-1">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>{lastUpdated ? `Atualizado: ${lastUpdated.toLocaleTimeString("pt-BR")}` : "Carregando..."}</span>
            </div>
            <button
              onClick={openFullscreen}
              className="flex items-center gap-2 px-3 py-1 bg-zinc-800/70 hover:bg-zinc-700/70 border border-zinc-600 rounded-full text-xs text-zinc-300 hover:text-white transition-all duration-200"
              title="Tela cheia para TV"
            >
              <Maximize className="h-4 w-4" />
              <span className="hidden sm:inline">TV</span>
            </button>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-red-900/40 bg-red-950/40 p-4 text-sm text-red-200 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5" />
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Trophy} label="Vendas Totais" value={formatBRL(total)} />
          <StatCard icon={Users} label="Post-its Puxados" value={String(puxadosTotal)} sub={`Ganha 1 a cada ${formatBRL(GANHA_1_POSTIT_A_CADA)}`} />
          <StatCard icon={Target} label="Valor Garantido" value={formatBRL(puxadosTotal * VALOR_POSTIT)} />
          <StatCard icon={Target} label="Progresso da Meta" value={`${pctMeta.toFixed(1)}%`} sub={<ProgressBar value={pctMeta} />} />
        </section>

        {campeao && campeao.vendas > 0 && (
          <section>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent p-5 ring-1 ring-amber-500/20">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-300"><Trophy className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm text-amber-300">CAMPEÃO GERAL (ATUAL)</p>
                    <p className="text-xl font-semibold text-zinc-50">{campeao.seller} — {formatBRL(campeao.vendas)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {ranking.length > 0 && (
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ranking.slice(0, 3).map((r, idx) => <TopCard key={r.seller} pos={idx + 1} item={r} />)}
          </section>
        )}

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Ranking Geral de Líderes</h2>
          <RankingTable ranking={ranking} />
        </section>

        <footer className="text-center text-xs text-zinc-500 pt-4">
          <p>🔥 Bora pra cima! Acelera nas vendas pra garantir o máximo de post-its! 💸🏆</p>
        </footer>
      </div>
    </div>
  );
}