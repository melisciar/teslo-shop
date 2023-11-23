import { SummaryTile } from '@/components/admin'
import { AdminLayout } from '@/components/layouts'
import { AccessTimeFilledOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'

const DashboardPage = () => {
  return (
    <AdminLayout
      title={'Dashboard'}
      subtitle={'Estadísticas generales'}
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile title={1} subtitle={'Órdenes totales'} icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40}} />} />
        <SummaryTile title={2} subtitle={'Órdenes pagadas'} icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40}} />} />
        <SummaryTile title={3} subtitle={'Órdenes pendientes'} icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40}} />} />
        <SummaryTile title={4} subtitle={'Clientes'} icon={<GroupOutlined color='primary' sx={{ fontSize: 40}} />} />
        <SummaryTile title={5} subtitle={'Productos'} icon={<CategoryOutlined color='warning' sx={{ fontSize: 40}} />} />
        <SummaryTile title={6} subtitle={'Sin existencias'} icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40}} />} />
        <SummaryTile title={7} subtitle={'Bajo inventario'} icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40}} />} />
        <SummaryTile title={8} subtitle={'Actualización en'} icon={<AccessTimeFilledOutlined color='secondary' sx={{ fontSize: 40}} />} />
      </Grid>
    </AdminLayout>
  )
}

export default DashboardPage
