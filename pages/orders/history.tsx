import NextLink from "next/link";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ShopLayout } from "@/components/layouts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre Completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra información sobre el estado del pago",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "Ver orden",
    width: 100,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Link
          component={NextLink}
          href={`/orders/${params.row.id}`}
          underline="always"
        >
          Ver orden
        </Link>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: "Melina Sciarratta" },
  { id: 2, paid: false, fullname: "Melina Sciarratta" },
  { id: 3, paid: true, fullname: "Melina Sciarratta" },
  { id: 4, paid: false, fullname: "Melina Sciarratta" },
  { id: 5, paid: true, fullname: "Melina Sciarratta" },
  { id: 6, paid: true, fullname: "Melina Sciarratta" },
  { id: 7, paid: false, fullname: "Melina Sciarratta" },
  { id: 8, paid: true, fullname: "Melina Sciarratta" },
  { id: 9, paid: true, fullname: "Melina Sciarratta" },
  { id: 10, paid: true, fullname: "Melina Sciarratta" },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title={"Historial de órdenes"}
      pageDescription={"Historial de órdenes del cliente"}
    >
      <Typography variant="h1" component="h1">
        Historial de órdenes
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            pageSizeOptions={[5, 10, 25]}
            autoHeight
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
