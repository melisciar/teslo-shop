import NextLink from "next/link";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "@/components/layouts";

const RegisterPage = () => {
  return (
    <AuthLayout title="Registro">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Registrarse
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Nombre" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Correo" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Registrarse
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <Link component={NextLink} href="/auth/login" underline="always">
              ¿Ya tienes una cuenta?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
