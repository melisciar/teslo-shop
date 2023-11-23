import { Typography } from '@mui/material'
import { AdminLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui'

export default function HomePage() {
  const { products, isLoading } = useProducts('/products')

  return (
    <>
      <AdminLayout
        title={'Teslo-Shop - Home'}
        pageDescription={'Encuentra los mejores productos de Teslo aquí'}
      >
        <Typography variant='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>
          Todos los productos
        </Typography>

        {isLoading ? (
          <FullScreenLoading />
        ) : (
          <ProductList products={products} />
        )}
      </AdminLayout>
    </>
  )
}
