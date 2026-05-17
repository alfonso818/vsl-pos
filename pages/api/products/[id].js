import prisma from '../../../lib/prisma'

export default async function handler(req, res) {

  const { id } = req.query

  if (req.method === 'GET') {

    const product = await prisma.products.findUnique({
      where: {
        id: BigInt(id)
      }
    })

    return res.json(product)
  }

  if (req.method === 'PUT') {

    const data = req.body

    const product = await prisma.products.update({
      where: {
        id: BigInt(id)
      },
      data: {
        name: data.name,
        category: data.category,
        price: parseInt(data.price),
        capital_price: parseInt(data.capital_price),
        stock: parseInt(data.stock)
      }
    })

    return res.json(product)
  }

  if (req.method === 'DELETE') {

    await prisma.products.delete({
      where: {
        id: BigInt(id)
      }
    })

    return res.json({
      message: 'Produk dihapus'
    })
  }

  return res.status(405).json({
    message: 'Method not allowed'
  })
}