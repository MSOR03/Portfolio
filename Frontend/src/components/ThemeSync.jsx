"use client";

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const ThemeSync = () => {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    // Determinar el tema efectivo
    const effectiveTheme = theme === 'system' ? systemTheme : theme;
    
    if (typeof document !== 'undefined' && effectiveTheme) {
      const root = document.documentElement;
      
      // Remover ambas clases primero
      root.classList.remove('light', 'dark');
      
      // Agregar la clase correcta
      root.classList.add(effectiveTheme);
      
      // Sincronizar atributo data-theme
      root.setAttribute('data-theme', effectiveTheme);
      
      // Sincronizar color-scheme nativo del navegador
      root.style.colorScheme = effectiveTheme;
    }
  }, [theme, systemTheme]);

  return null;
};

export default ThemeSync;