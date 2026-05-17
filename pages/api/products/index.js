import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await prisma.products.findMany({
      orderBy: {
        id: 'desc'
      }
    })

    return res.json(products)
  }

  if (req.method === 'POST') {
    const data = req.body

    const product = await prisma.products.create({
      data
    })

    return res.json(product)
  }

  return res.status(405).json({
    message: 'Method not allowed'
  })
}