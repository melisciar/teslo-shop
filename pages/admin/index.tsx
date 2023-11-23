import { AdminLayout } from "@/components/layouts"
import { DashboardOutlined } from "@mui/icons-material"

const DashboardPage = () => {
  return (
    <AdminLayout title={"Dashboard"} subtitle={"Estadísticas generales"} icon={<DashboardOutlined />}>
        <h3>Hola mundo</h3>
    </AdminLayout>
  )
}

export default DashboardPage
