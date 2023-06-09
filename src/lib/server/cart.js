// カートの処理を行うサーバーサイドのコード

import { database } from '$lib/server/mongodb'

// カートに商品データを追加する
export const addToCart = async (productId) => {
  await database.collection('cart').insertOne({ productId })
}

// カート内のデータを取得する
export const loadCart = async () => {
  const cart = await database.collection('cart').find()
  return await cart.map((doc) => doc.productId).toArray()
}
