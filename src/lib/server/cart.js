// カートの処理を行うサーバーサイドのコード

import { readFile, writeFile } from 'fs/promises'

const dataPath = 'data/cart.json'

// カートに商品データを追加する
export const addToCart = async (productId) => {
  const cart = await loadCart()
  if (!cart.includes(productId)) {
    cart.push(productId)
  }
  await writeFile(dataPath, JSON.stringify(cart), { encoding: 'utf-8' })
}

// カート内のデータを取得する
export const loadCart = async () => {
  try {
    const content = await readFile(dataPath)
    return JSON.parse(content)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []
    } else {
      throw err
    }
  }
}
