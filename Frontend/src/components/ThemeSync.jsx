"use client";

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const ThemeSync = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Sincronizar el tema con el atributo data-theme del CSS
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme || 'dark');
    }
  }, [theme]);

  return null; // Este componente no renderiza nada visible
};

export default ThemeSync;