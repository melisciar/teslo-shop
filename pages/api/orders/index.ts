import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { IOrder } from '@/interfaces'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, dbProduts } from '@/database'
import { Order, Product } from '@/models'

type Data =
  | {
      message: string
    }
  | IOrder

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res)
    default:
      return res
        .status(400)
        .json({ message: 'Este método no se encuentra implementado' })
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder

  // Verificar que tengamos un usuario
  const session: any = await getServerSession(req, res, authOptions)

  if (!session) {
    return res
      .status(401)
      .json({ message: 'Debe estar autenticado para realizar esta acción' })
  }

  const productsIds = orderItems.map((product) => product._id)
  await db.connect()

  const dbProduts = await Product.find({ _id: { $in: productsIds } })

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProduts.find(
        (prod) => prod.id === current._id
      )?.price
      if (!currentPrice) {
        throw new Error('Verifique el carrito de nuevo, el producto no existe')
      }

      return currentPrice * current.quantity + prev
    }, 0)

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

    const backendTotal = subTotal * (taxRate + 1)

    if (total !== backendTotal) {
      throw new Error('El total no coincide con el monto de la orden')
    }

    const userId = session.user._id
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId })
    await newOrder.save()

    return res.status(201).json(newOrder)
  } catch (error: any) {
    await db.disconnect()
    console.log(error)
    return res
      .status(400)
      .json({ message: error.message || 'Revise logs del servidor' })
  }

  return res.status(200).json(req.body)
}
