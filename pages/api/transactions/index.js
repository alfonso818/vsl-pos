import prisma from '../../../lib/prisma'

export default async function handler(req, res) {

  if (req.method === 'GET') {

    const transactions = await prisma.transactions.findMany({
      include: {
        items: true
      },
      orderBy: {
        id: 'desc'
      }
    })

    return res.json(transactions)
  }

  if (req.method === 'POST') {

    const { items } = req.body

    let total = 0

    for (const item of items) {
      total += item.price * item.qty
    }

    const transaction = await prisma.transactions.create({
      data: {
        total
      }
    })

    for (const item of items) {

      await prisma.transaction_items.create({
        data: {
          transaction_id: transaction.id,
          product_id: BigInt(item.product_id),
          qty: item.qty,
          price: item.price
        }
      })

      const product = await prisma.products.findUnique({
        where: {
          id: BigInt(item.product_id)
        }
      })

      await prisma.products.update({
        where: {
          id: BigInt(item.product_id)
        },
        data: {
          stock: product.stock - item.qty
        }
      })
    }

    return res.json({
      message: 'Transaksi berhasil'
    })
  }

  return res.status(405).json({
    message: 'Method not allowed'
  })
}