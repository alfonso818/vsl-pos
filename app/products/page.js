'use client'

import { useEffect, useState } from 'react'

export default function ProductsPage() {

  const [products, setProducts] = useState([])

  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    capital_price: '',
    stock: ''
  })

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {

    const req = await fetch('/api/products')
    const res = await req.json()

    setProducts(res)
  }

  async function saveProduct() {

    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    alert('Produk ditambahkan')

    loadProducts()
  }

  async function deleteProduct(id) {

    await fetch(`/api/products/${id}`, {
      method: 'DELETE'
    })

    loadProducts()
  }

  return (
    <div style={{ padding: 40 }}>

      <h1>Produk</h1>

      <input
        placeholder="Nama Produk"
        onChange={(e) => setForm({
          ...form,
          name: e.target.value
        })}
      />

      <br /><br />

      <input
        placeholder="Kategori"
        onChange={(e) => setForm({
          ...form,
          category: e.target.value
        })}
      />

      <br /><br />

      <input
        placeholder="Harga"
        onChange={(e) => setForm({
          ...form,
          price: e.target.value
        })}
      />

      <br /><br />

      <input
        placeholder="Modal"
        onChange={(e) => setForm({
          ...form,
          capital_price: e.target.value
        })}
      />

      <br /><br />

      <input
        placeholder="Stock"
        onChange={(e) => setForm({
          ...form,
          stock: e.target.value
        })}
      />

      <br /><br />

      <button onClick={saveProduct}>
        Simpan
      </button>

      <hr />

      {
        products.map((item) => (
          <div key={item.id}>

            <h3>{item.name}</h3>

            <p>Harga: Rp {item.price}</p>

            <p>Stock: {item.stock}</p>

            <button
              onClick={() => deleteProduct(item.id)}
            >
              Hapus
            </button>

            <hr />

          </div>
        ))
      }

    </div>
  )
}