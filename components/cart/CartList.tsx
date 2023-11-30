import { useContext } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import { ItemCounter } from '../ui'
import { CartContext } from '@/context'
import { ICartProduct, IOrderItem } from '@/interfaces'

interface Props {
  editable?: boolean
  products?: IOrderItem[]
}

export const CartList: React.FC<Props> = ({ editable = false, products }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext)

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue
    updateCartQuantity(product)
  }

  const productsToShow = products ? products : cart

  return (
    <>
      {productsToShow.map((product) => (
        <Grid container spacing={2} key={product.slug + product.size}>
          <Grid item xs={3}>
            <Link component={NextLink} href={`/product/${product.slug}`}>
              <CardActionArea>
                <CardMedia
                  image={product.image}
                  component='img'
                  sx={{ borderRadius: '5px' }}
                />
              </CardActionArea>
            </Link>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Talle: <strong>{product.size}</strong>{' '}
              </Typography>
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  onUpdatedQuantity={(value) => {
                    onNewCartQuantityValue(product as ICartProduct, value)
                  }}
                />
              ) : (
                <Typography variant='caption'>
                  {product.quantity} producto{product.quantity > 1 && 's'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display='flex'
            alignItems='center'
            flexDirection='column'
          >
            <Typography variant='subtitle1'>${product.price}</Typography>
            {editable && (
              <Button
                variant='text'
                color='secondary'
                onClick={() => removeCartProduct(product as ICartProduct)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  )
}
