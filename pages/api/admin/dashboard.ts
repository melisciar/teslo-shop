import { db } from '@/database'
import { Order, Product, User } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | {
      numberOfOrders: number
      paidOrders: number // isPaid
      unpaidOrders: number
      numberOfClients: number // role: client
      numberOfProducts: number
      productsWithNoInventory: number // 0
      lowInventory: number // productos con 10 o menos en stock
    }
  | { message: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return obtenerValores(req, res)

    default:
      res
        .status(400)
        .json({ message: 'Este método no se encuentra implementado' })
  }
}

const obtenerValores = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect()

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    Order.countDocuments(),
    Order.countDocuments({ isPaid: true }),
    User.countDocuments({ role: 'client' }),
    Product.countDocuments(),
    Product.countDocuments({ inStock: 0 }),
    Product.countDocuments({
      $and: [{ inStock: { $lte: 10 } }, { inStock: { $gt: 0 } }],
    }),
  ])

  await db.disconnect()
  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    unpaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  })
}
