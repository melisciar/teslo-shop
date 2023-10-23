import { useContext } from 'react'
import NextLink from 'next/link'

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material'

import { CartContext } from '@/context'
import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { countries } from '@/utils'

const SummaryPage = () => {
  const { shippingAddress, numberOfItems } = useContext(CartContext)

  if (!shippingAddress) {
    return <></>
  }

  const {
    firstName,
    lastName,
    address,
    address2 = '',
    zip,
    city,
    country,
    phone,
  } = shippingAddress

  return (
    <ShopLayout title='Resumen de compra' pageDescription='Resumen de la orden'>
      <Typography variant='h1' component='h1'>
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Resumen ({numberOfItems} producto{numberOfItems > 1 && 's'})
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>
                  Dirección de entrega
                </Typography>
                <Link
                  component={NextLink}
                  href='/checkout/address'
                  underline='always'
                >
                  Editar
                </Link>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address} {address2}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography>
                {countries.find((c) => c.code === country)?.name}
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <Link component={NextLink} href='/cart' underline='always'>
                  Editar
                </Link>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
