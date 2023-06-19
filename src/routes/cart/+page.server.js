// カート内の商品データをページコンポーネントに渡す処理

import { loadCartItems, addToCart, removeFromCart } from '$lib/server/cart'

export const load = async ({ locals }) => {
  // カート内にある商品データを取得して返す
  let cart = []
  if (locals.currentUser) {
    cart = await loadCartItems(locals.currentUser.userId)
  }
  return { cart }
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
