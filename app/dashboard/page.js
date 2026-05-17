'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {

  const [products, setProducts] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {

    const prod = await fetch('/api/products')
    const prodJson = await prod.json()

    const trx = await fetch('/api/transactions')
    const trxJson = await trx.json()

    setProducts(prodJson)
    setTransactions(trxJson)
  }

  const totalIncome = transactions.reduce(
    (a, b) => a + b.total,
    0
  )

  return (
    <div style={{ padding: 40 }}>

      <h1>Dashboard POS</h1>

      <hr />

      <h2>Total Produk: {products.length}</h2>

      <h2>Total Transaksi: {transactions.length}</h2>

      <h2>Total Pendapatan: Rp {totalIncome}</h2>

    </div>
  )
}