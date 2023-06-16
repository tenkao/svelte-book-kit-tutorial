// カート内の商品データをページコンポーネントに渡す処理

import { loadProducts } from '$lib/server/product'
import { loadCartItems } from '$lib/server/cart'

// カート内にある商品データを取得する
const getProductsInCart = async (userId) => {
  const cartItems = await loadCartItems(userId)

  return cartItems
}

export const load = async ({ locals }) => {
  // カート内にある商品データを取得して返す
  let products = []
  if (locals.currentUser) {
    products = await getProductsInCart(locals.currentUser.userId)
  }

  return { products }
}
