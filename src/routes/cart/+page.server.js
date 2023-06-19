// カート内の商品データをページコンポーネントに渡す処理

import { loadCartItems, addToCart, removeFromCart } from '$lib/server/cart'

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

// フォームアクション
export const actions = {
  // フォームから送信されたデータを取得し、カートに追加する
  add: async ({ locals, request }) => {
    if (locals.currentUser) {
      const data = await request.formData()
      await addToCart(locals.currentUser.userId, data.get('productId'))
    }
  },
  // フォームから送信されたデータを取得し、カートから削除する
  remove: async ({ locals, request }) => {
    if (locals.currentUser) {
      const data = await request.formData()
      await removeFromCart(locals.currentUser.userId, data.get('productId'))
    }
  },
}
