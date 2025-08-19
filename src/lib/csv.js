export const normalize = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const formatBRL = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
    .format(Number(n || 0));

export const parseCurrency = (raw) => {
  if (raw == null) return 0;
  let s = String(raw).trim();
  if (!s) return 0;
  s = s.replace(/[^0-9.,-]/g, "");
  if (s.includes(",")) {
    s = s.replace(/\./g, "").replace(",", ".");
  }
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
};
