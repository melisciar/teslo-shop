import useSWR from 'swr'
import { CategoryOutlined } from '@mui/icons-material'
import { CardMedia, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

import { AdminLayout } from '@/components/layouts'
import { IProduct } from '@/interfaces'

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Foto',
    renderCell: ({ row }) => {
      return (
        <a href={`/product/${row.slug}`} target='_blank'>
          <CardMedia
            component='img'
            className='fadeIn'
            alt={row.title}
            image={`/products/${row.img}`}
          />
        </a>
      )
    },
  },
  { field: 'title', headerName: 'Titulo', width: 250 },
  { field: 'gender', headerName: 'Género' },
  { field: 'type', headerName: 'Tipo' },
  { field: 'inStock', headerName: 'Stock' },
  { field: 'price', headerName: 'Precio' },
  { field: 'sizes', headerName: 'Talles', width: 250 },
]
const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products')

  if (!data && !error) return <></>

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug,
  }))
  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subtitle={'Mantenimiento de Productos'}
      icon={<CategoryOutlined />}
    >
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            pageSizeOptions={[5, 10, 25]}
            autoHeight
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default ProductsPage
