"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      forcedTheme="dark" // <--- ADD THIS LINE
      enableSystem={false} // <--- Disable system detection
    >
      {children}
    </ThemeProvider>
  );
}