import { useContext } from 'react'
import { CartContext } from '@/context'
import { Grid, Typography } from '@mui/material'
import { currency } from '@/utils'

interface Props {
  valores?: {
    numberOfItems: number
    subTotal: number
    total: number
    tax: number
  }
}

export const OrderSummary: React.FC<Props> = ({ valores }) => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext)
  const valuesToShow = valores
    ? valores
    : { numberOfItems, subTotal, total, tax }

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Cantidad:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>
          {valuesToShow.numberOfItems} item
          {valuesToShow.numberOfItems > 1 && 's'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(valuesToShow.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%):
        </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(valuesToShow.tax)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant='subtitle1'>Total: </Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
        <Typography variant='subtitle1'>
          {currency.format(valuesToShow.total)}
        </Typography>
      </Grid>
    </Grid>
  )
}
