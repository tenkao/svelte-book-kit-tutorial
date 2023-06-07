// カート内の商品データをページコンポーネントに渡す処理

import { loadProducts } from '$lib/server/product'
import { loadCart } from '$lib/server/cart'

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
