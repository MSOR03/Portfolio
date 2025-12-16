"use client";

import { useState, useEffect } from "react";

export default function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Usar requestAnimationFrame para montar inmediatamente después del primer frame
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  // Mostrar fallback inmediatamente en lugar de null para evitar flash
  if (!mounted) return fallback;

  return <>{children}</>;
}
