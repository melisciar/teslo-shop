import { Box } from "@mui/material";
import Head from "next/head";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          height="calc(100vh - 200px)"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
