import NextLink from "next/link";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Link component={NextLink} href="/" display="flex" alignItems="center">
          <Typography variant="h6">Teslo |</Typography>
          <Typography sx={{ ml: 0.5 }}>Shop</Typography>
        </Link>
        <Box flex={1} />
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Link component={NextLink} href="/category/men">
            <Button>Hombres</Button>
          </Link>
          <Link component={NextLink} href="/category/women">
            <Button>Mujeres</Button>
          </Link>
          <Link component={NextLink} href="/category/children">
            <Button>Niñxs</Button>
          </Link>
        </Box>
        <Box flex={1} />
        <IconButton>
          <SearchOutlined />
        </IconButton>

        <Link component={NextLink} href="/cart">
          <IconButton>
            <Badge badgeContent={2} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Link>
        <Button>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
