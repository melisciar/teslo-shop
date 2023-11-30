import { IOrder } from '@/interfaces'
import { isValidObjectId } from 'mongoose'
import { db } from '.'
import { Order } from '@/models'

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) {
    return null
  }

  await db.connect()

  const order = await Order.findById(id).lean()

  await db.disconnect()

  if (!order) {
    return null
  }

  order.orderItems = order.orderItems.map((product) => {
    product.image = product.image.includes('http')
    ? product.image
    : `${process.env.HOST_NAME}products/${product.image}`
    return product
  })

  return JSON.parse(JSON.stringify(order))
}

export const getOrdersByUser = async (
  userId: string
): Promise<IOrder[] | null> => {
  if (!isValidObjectId(userId)) {
    return null
  }

  await db.connect()
  const orders = await Order.find({ user: userId }).lean()
  await db.disconnect()

  return JSON.parse(JSON.stringify(orders))
}
