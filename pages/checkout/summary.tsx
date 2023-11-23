import { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import Cookies from 'js-cookie'

import { CartContext } from '@/context'
import { CartList, OrderSummary } from '@/components/cart'
import { AdminLayout } from '@/components/layouts'
import { countries } from '@/utils'
import { useRouter } from 'next/router'

const SummaryPage = () => {
  const router = useRouter()
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext)
  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address')
    }
  }, [router])

  const onCreateOrder = async () => {
    setIsPosting(true)

    const { hasError, message } = await createOrder() //TODO: depende del resultado

    if (hasError) {
      setIsPosting(false)
      setErrorMessage(message)
      return
    }

    router.replace(`/orders/${message}`)
  }

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
    <AdminLayout title='Resumen de compra' pageDescription='Resumen de la orden'>
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

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Button
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  {isPosting ? 'Enviando...' : 'Confirmar orden'}
                </Button>

                <Chip
                  color='error'
                  label={errorMessage}
                  sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default SummaryPage
