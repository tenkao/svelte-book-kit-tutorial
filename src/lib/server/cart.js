// カートの処理を行うサーバーサイドのコード

import { database } from '$lib/server/mongodb'

// カートに商品データを追加する
export const addToCart = async (userId, productId) => {
  await database.collection('cartItems').insertOne({ userId, productId })
}

// カートから商品データを削除する
export const removeFromCart = async (userId, productId) => {
  await database.collection('cartItems').deleteOne({ userId, productId })
}

// カート内のデータを取得する
export const loadCartItems = async (userId) => {
  const items = await database.collection('cartItems').find({ userId })
  const productIds = await items.map((item) => item.productId).toArray()
  const products = await database.collection('products').find({ _id: { $in: productIds } })
  return await products.toArray()
}
