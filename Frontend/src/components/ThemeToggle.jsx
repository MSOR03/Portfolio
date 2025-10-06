"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ className = "" }) => {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Placeholder mientras se monta
  if (!mounted) {
    return (
      <div 
        className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-pulse ${className}`} 
      />
    );
  }

  const toggleTheme = () => {
    // Alternar directamente entre light y dark (sin system)
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Usar resolvedTheme que siempre da el tema efectivo
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative group w-12 h-12 rounded-full 
        backdrop-blur-md border transition-all duration-300 
        ${isDark 
          ? 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30' 
          : 'bg-black/10 border-black/20 hover:bg-black/20 hover:border-black/30'
        }
        ${className}
      `}
      aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sol */}
        <FiSun 
          className={`
            absolute w-5 h-5 text-yellow-500 transition-all duration-300 
            ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
          `} 
        />
        {/* Luna */}
        <FiMoon 
          className={`
            absolute w-5 h-5 text-blue-300 transition-all duration-300
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
          `} 
        />
        
        {/* Efecto hover */}
        <div className={`
          absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100
          ${isDark ? 'bg-white/5' : 'bg-black/5'}
        `} />
      </div>
      
      {/* Efecto click */}
      <div className={`
        absolute inset-0 rounded-full transition-all duration-700 opacity-0 group-active:opacity-100
        ${isDark ? 'bg-white/20 animate-ping' : 'bg-black/20 animate-ping'}
      `} />
    </button>
  );
};

export default ThemeToggle;