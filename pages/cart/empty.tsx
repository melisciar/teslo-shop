import NextLink from "next/link";
import { Box, Link, Typography } from "@mui/material";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { AdminLayout } from "@/components/layouts";

const EmptyPage = () => {
  return (
    <AdminLayout
      title="Carrito vacío"
      pageDescription="No hay artículos en el carrito de compras"
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="calc(100vh - 200px)"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography marginLeft={2}>Su carrito está vacío</Typography>
          <Link component={NextLink} href="/" typography="h4" color="secondary">
            Regresar
          </Link>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default EmptyPage;
