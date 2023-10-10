import { GetServerSideProps, NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { dbProduts } from "@/database";
import { IProduct } from "@/interfaces";

interface Props {
  products: IProduct[];
  hayProductos: boolean;
  query: string;
}
const SearchPage: NextPage<Props> = ({ products, hayProductos, query }) => {
  return (
    <>
      <ShopLayout
        title={"Teslo-Shop - Search"}
        pageDescription={"Encuentra los mejores productos de Teslo aquí"}
      >
        <Typography variant="h1">Buscar producto</Typography>
        {hayProductos ? (
          <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
            Búsqueda: {query}
          </Typography>
        ) : (
          <Box display={"flex"}>
            <Typography variant="h2" sx={{ mb: 1 }}>
              No encontramos ningún producto que coincida con
            </Typography>
            <Typography
              variant="h2"
              sx={{ ml: 1 }}
              color="secondary"
              textTransform="capitalize"
            >
              {query}
            </Typography>
          </Box>
        )}

        <ProductList products={products} />
      </ShopLayout>
    </>
  );
};

export default SearchPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.trim().length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProduts.getProductsByTerm(query);
  const hayProductos = products.length > 0;

  if (!hayProductos) {
    products = await dbProduts.getAllProducts();
  }

  return {
    props: { products, hayProductos, query },
  };
};
