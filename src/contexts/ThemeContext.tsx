import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    bg: string;
    card: string;
    cardBorder: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    primary: string;
    inputBg: string;
  };
}

const lightColors = {
  bg: '#F9FAFB',
  card: '#FFFFFF',
  cardBorder: '#E4E4E7',
  textPrimary: '#18181B',
  textSecondary: '#52525B',
  textMuted: '#A1A1AA',
  primary: '#2563EB',
  inputBg: '#F4F4F5'
};

const darkColors = {
  bg: '#09090B',
  card: '#18181B',
  cardBorder: '#27272A',
  textPrimary: '#FAFAFA',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
  primary: '#3B82F6',
  inputBg: '#09090B'
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('dark'); // Default to sleek dark mode

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  const value = React.useMemo(() => ({
    theme,
    isDark,
    toggleTheme,
    colors
  }), [theme, isDark, toggleTheme, colors]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
