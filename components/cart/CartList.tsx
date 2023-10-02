import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { initialData } from "@/database/products";
import { ItemCounter } from "../ui";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  editable?: boolean;
}

export const CartList: React.FC<Props> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container spacing={2} key={product.slug}>
          <Grid item xs={3}>
            {/* //TODO: Llevar a la página del producto */}
            <Link component={NextLink} href={"/product/slug"}>
              <CardActionArea>
                <CardMedia
                  image={`/products/${product.images[0]}`}
                  component="img"
                  sx={{ borderRadius: "5px" }}
                />
              </CardActionArea>
            </Link>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talle: <strong>M</strong>{" "}
              </Typography>
              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant="caption">3 ítems</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>
            {editable && (
              <Button variant="text" color="secondary">
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
