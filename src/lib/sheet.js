import { SHEET_CSV_URL, PARTICIPANTES } from "./config";
import { normalize, parseCurrency } from "./csv";

// Parser de CSV que lida com campos entre aspas
const parseCsvLine = (line) => {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' && (i === 0 || line[i - 1] !== "\\")) {
      if (inQuotes && i < line.length - 1 && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result.map((v) => v.trim());
};

const parseCsv = (csvText) => {
  if (!csvText) return [];
  const lines = csvText.trim().replace(/\r/g, "").split("\n");
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]);
  return lines
    .slice(1)
    .map((line) => {
      if (!line.trim()) return null;
      const values = parseCsvLine(line);
      const row = {};
      headers.forEach((h, i) => (row[h] = values[i] || ""));
      return row;
    })
    .filter(Boolean);
};

export async function fetchSheetSafe() {
  try {
    const res = await fetch(`${SHEET_CSV_URL}&cacheBust=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) {
      return { error: `Falha na requisição: Status ${res.status}` };
    }
    const text = await res.text();
    if (!text || text.toLowerCase().includes("<html")) {
      return { error: "A resposta não foi um CSV. Verifique o link." };
    }
    return { data: parseCsv(text) };
  } catch (e) {
    return { error: `Erro de rede: ${e.message}` };
  }
}

const findHeaderKey = (fields, search) => {
  const target = normalize(search);
  for (const f of fields) {
    if (normalize(f).includes(target)) return f;
  }
  return null;
};

export function groupSales(rows) {
  const base = new Map(
    PARTICIPANTES.map((p) => [
      normalize(p.nome),
      { ...p, seller: p.nome, vendas: 0, puxados: 0 },
    ])
  );

  if (!rows || !rows.length) {
    return {
      data: { ranking: Array.from(base.values()), total: 0, puxadosTotal: 0 },
      error: "Nenhuma linha de dados encontrada na planilha.",
    };
  }

  const fields = Object.keys(rows[0] || {});
  const colLider = findHeaderKey(fields, "líder");
  const colValorPago = findHeaderKey(fields, "valor pago");
  const colValorRecebido1 = findHeaderKey(fields, "valor recebido 1");
  const colValorContrato = findHeaderKey(fields, "valor do contrato");

  if (!colLider) {
    return {
      data: { ranking: Array.from(base.values()), total: 0, puxadosTotal: 0 },
      error: "Coluna 'Líder' não encontrada na planilha. Verifique o cabeçalho.",
    };
  }

  let total = 0;

  for (const r of rows) {
    const nome = String(r[colLider] || "").trim();
    const key = normalize(nome);
    if (!base.has(key)) continue;

    const candidatos = [colValorPago, colValorRecebido1, colValorContrato].filter(Boolean);
    let valor = 0;
    for (const c of candidatos) {
      if (r[c]) {
        const v = parseCurrency(r[c]);
        if (v > 0) {
          valor = v;
          break;
        }
      }
    }

    const obj = base.get(key);
    obj.vendas += valor;
    total += valor;
  }

  const ranking = Array.from(base.values()).sort((a, b) => b.vendas - a.vendas);
  return { data: { ranking, total, puxadosTotal: 0 }, error: null };
}
