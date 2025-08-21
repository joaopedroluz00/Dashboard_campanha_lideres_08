// src/components/Avatar.jsx
import React, { useMemo, useState } from "react";

const EXT = ["jpg", "jpeg", "png", "webp"];

// Pega o BASE_URL do Vite ou "/" como padrão
const BASE =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.BASE_URL) ||
  "/";

// Concatena base + caminho sem usar new URL
function assetUrl(path) {
  const base = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
  const clean = path.replace(/^\//, "");
  return `${base}/${clean}`;
}

function slugify(name = "") {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-"); // espaços -> hífen
}

function candidatesFor(name = "") {
  const slug = slugify(name);
  return EXT.map((ext) => assetUrl(`/avatars/${slug}.${ext}`));
}

function initialsOf(name = "") {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "?";
}

export default function Avatar({ name = "", size = 40, className = "" }) {
  const sources = useMemo(() => candidatesFor(name), [name]);
  const [idx, setIdx] = useState(0);
  const initials = useMemo(() => initialsOf(name), [name]);

  const onError = () => {
    setIdx((i) => (i < sources.length - 1 ? i + 1 : -1));
  };

  // Fallback com iniciais
  if (idx === -1) {
    return (
      <div
        className={`block flex-none rounded-full bg-zinc-800 text-zinc-200 
                    font-semibold ring-2 ring-white/10 shadow-sm 
                    flex items-center justify-center ${className}`}
        style={{ width: size, height: size, fontSize: Math.max(12, size * 0.42) }}
        title={name}
        aria-label={name}
      >
        {initials}
      </div>
    );
  }

  // Imagem do avatar
  return (
    <img
      src={sources[idx]}
      onError={onError}
      alt={name}
      title={name}
      className={`block flex-none rounded-full object-cover ring-2 ring-white/10 shadow-sm ${className}`}
      width={size}
      height={size}
      style={{ width: size, height: size, objectPosition: "center" }}
    />
  );
}