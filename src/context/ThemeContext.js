import React, { createContext, useContext } from 'react';
import { theme as baseTheme } from '../theme';

const ThemeContext = createContext({ theme: baseTheme });

export function ThemeProvider({ children }) {
  // Single theme — black/white with accent pops. No light/dark toggle.
  return (
    <ThemeContext.Provider value={{ theme: baseTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
