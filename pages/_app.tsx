import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "@/styles/globals.css";
import { lightTheme } from "@/themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
