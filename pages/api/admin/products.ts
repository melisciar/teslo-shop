import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string } | IProduct[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res)

    case 'PUT':
    case 'POST':

    default:
      res.status(400).json({ message: 'El método no existe' })
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect()

  const products = await Product.find().sort({title: 'asc'}).lean()

  await db.disconnect()

  /**
   * TODO:
   * Tendremos que actualizar las imágenes
   */

  res.status(200).json(products)
}
