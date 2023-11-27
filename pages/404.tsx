import { Box, Typography } from "@mui/material";
import { ShopLayout } from "@/components/layouts";

const Custom404 = () => {
  return (
    <ShopLayout
      title={"Page not found"}
      pageDescription={"No hay nada que mostrar aquí"}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="calc(100vh - 200px)"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Typography variant="h1" fontSize={80} fontWeight={200}>
          404 |{" "}
        </Typography>
        <Typography marginLeft={2}>No encontramos nada :(</Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
