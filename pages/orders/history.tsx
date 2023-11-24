import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { getServerSession } from 'next-auth'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { ShopLayout } from '@/components/layouts'
import { authOptions } from '../api/auth/[...nextauth]'
import { dbOrders } from '@/database'
import { IOrder } from '@/interfaces'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información sobre el estado del pago',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color='success' label='Pagada' variant='outlined' />
      ) : (
        <Chip color='error' label='No pagada' variant='outlined' />
      )
    },
  },
  {
    field: 'order',
    headerName: 'Ver orden',
    width: 100,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Link
          component={NextLink}
          href={`/orders/${params.row.orderId}`}
          underline='always'
        >
          Ver orden
        </Link>
      )
    },
  },
]

interface Props {
  orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, i) => ({
    id: i + 1,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id,
  }))

  return (
    <ShopLayout
      title={'Historial de órdenes'}
      pageDescription={'Historial de órdenes del cliente'}
    >
      <Typography variant='h1' component='h1'>
        Historial de órdenes
      </Typography>
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
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: any = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    }
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id)

  return {
    props: {
      orders,
    },
  }
}

export default HistoryPage
