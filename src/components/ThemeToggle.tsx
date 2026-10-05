import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: (theme: 'dark' | 'light') => void;
  size?: 'normal' | 'compact';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  size = 'normal'
}) => {
  return (
    <div
      role="group"
      aria-label="Theme mode selection"
      className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#0e1422] border border-slate-200 dark:border-[#222e44] transition-colors"
    >
      {/* Light Option */}
      <button
        type="button"
        onClick={() => onToggle('light')}
        aria-pressed={theme === 'light'}
        title="Switch to Light Mode"
        className={`flex items-center gap-1.5 rounded-lg font-semibold text-xs transition-all duration-200 cursor-pointer ${
          size === 'compact' ? 'px-2 py-1' : 'px-2.5 py-1.5'
        } ${
          theme === 'light'
            ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
            : 'text-slate-500 hover:text-slate-900 border border-transparent'
        }`}
      >
        <Sun className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
        <span className={size === 'compact' ? 'hidden sm:inline' : 'inline'}>Light</span>
      </button>

      {/* Dark Option */}
      <button
        type="button"
        onClick={() => onToggle('dark')}
        aria-pressed={theme === 'dark'}
        title="Switch to Dark Mode"
        className={`flex items-center gap-1.5 rounded-lg font-semibold text-xs transition-all duration-200 cursor-pointer ${
          size === 'compact' ? 'px-2 py-1' : 'px-2.5 py-1.5'
        } ${
          theme === 'dark'
            ? 'bg-[#1a2336] text-white shadow-sm border border-[#2b3a56]'
            : 'text-slate-400 hover:text-slate-200 border border-transparent'
        }`}
      >
        <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-rose-400 fill-rose-400/20' : 'text-slate-500'}`} />
        <span className={size === 'compact' ? 'hidden sm:inline' : 'inline'}>Dark</span>
      </button>
    </div>
  );
};
