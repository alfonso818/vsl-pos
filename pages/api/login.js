import prisma from '../../lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, password } = req.body

  const admin = await prisma.admins.findUnique({
    where: { username }
  })

  if (!admin) {
    return res.status(401).json({
      message: 'Username salah'
    })
  }

  const valid = await bcrypt.compare(password, admin.password)

  if (!valid) {
    return res.status(401).json({
      message: 'Password salah'
    })
  }

  const token = jwt.sign(
    {
      id: admin.id,
      username: admin.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  )

  return res.status(200).json({
    token
  })
}