"use client";
import "./globals.css";
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { App } from "@/app";

export default function RootLayout(props: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ backgroundColor: 'transparent !important' }}>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme} defaultMode='dark'>
            <CssBaseline />
            <React.Suspense fallback={<div></div>}>
              <App {...props} />
            </React.Suspense>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}