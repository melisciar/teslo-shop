import { Box, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'

interface Props {
  currentValue: number
  maxValue: number
  onUpdatedQuantity: (quantity: number) => void
}
export const ItemCounter: React.FC<Props> = ({
  currentValue,
  maxValue,
  onUpdatedQuantity,
}) => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton
        disabled={currentValue === 1}
        onClick={() => onUpdatedQuantity(currentValue - 1)}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton
        disabled={currentValue === maxValue}
        onClick={() => onUpdatedQuantity(currentValue + 1)}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
