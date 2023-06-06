import { readFile } from 'fs/promises'
import { loadCart } from '$lib/server/cart'

// 商品データをロードする
const loadProducts = async () => {
  // ファイルの位置はプロジェクトのルートからの相対パス
  const content = await readFile('data/products.json', { encoding: 'utf-8' })
  return JSON.parse(content)
}

// カート内にある商品データを取得する
const getProductsInCart = async () => {
  const products = await loadProducts()
  const cart = await loadCart()
  return cart.map((productId) =>
    products.find((product) => product.id === productId)
  )
}

export const load = async () => {
  // カート内にある商品データを取得する
  const products = await getProductsInCart()

  // カート内の商品データを返す
  return { products }
}
