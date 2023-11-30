import { SummaryTile } from '@/components/admin'
import { AdminLayout } from '@/components/layouts'
import { DashboardSummaryResponse } from '@/interfaces'
import {
  AccessTimeFilledOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import useSWR from 'swr'
import { useState, useEffect } from 'react';

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    '/api/admin/dashboard',
    {
      refreshInterval: 30 * 1000, // 30 segundos
    }
  )

  const [refreshIn, setRefreshIn] = useState(30)

  useEffect(() => {
    const interval = setInterval(() =>{
        setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  

  if (!error && !data) {
    return <></>
  }

  if (error) {
    console.log(error)
    return <Typography>Error al cargar la información</Typography>
  }

  const {
    numberOfOrders,
    paidOrders,
    unpaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data!

  return (
    <AdminLayout
      title={'Dashboard'}
      subtitle={'Estadísticas generales'}
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subtitle={'Órdenes totales'}
          icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={paidOrders}
          subtitle={'Órdenes pagadas'}
          icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={unpaidOrders}
          subtitle={'Órdenes pendientes'}
          icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfClients}
          subtitle={'Clientes'}
          icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfProducts}
          subtitle={'Productos'}
          icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={productsWithNoInventory}
          subtitle={'Sin existencias'}
          icon={
            <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />
          }
        />
        <SummaryTile
          title={lowInventory}
          subtitle={'Bajo inventario'}
          icon={
            <ProductionQuantityLimitsOutlined
              color='warning'
              sx={{ fontSize: 40 }}
            />
          }
        />
        <SummaryTile
          title={refreshIn}
          subtitle={'Actualización en'}
          icon={
            <AccessTimeFilledOutlined color='secondary' sx={{ fontSize: 40 }} />
          }
        />
      </Grid>
    </AdminLayout>
  )
}

export default DashboardPage
