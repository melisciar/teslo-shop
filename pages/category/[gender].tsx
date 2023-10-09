import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { useProducts } from "@/hooks";
import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useEffect } from "react";
import { SHOP_CONSTANTS } from "@/database";

const GenderCategoryPage = () => {
  const router = useRouter();
  const gender = (router.query.gender as string) ?? "all";

  useEffect(() => {
    if (!SHOP_CONSTANTS.validGenders.includes(gender)) {
      router.push("/404");
      return;
    }
  }, [gender, router]);

  const { products, isLoading } = useProducts(`/products?gender=${gender}`);

  return (
    <ShopLayout title={`Teslo Shop - ${gender}`} pageDescription={""}>
      <Typography variant="h1">Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos de la categoría {gender}
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default GenderCategoryPage;
