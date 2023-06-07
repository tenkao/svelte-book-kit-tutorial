import { readFile } from 'fs/promises'

// 商品データを読み込む
const loadProducts = async () => {
  const content = await readFile('data/products.json', { encoding: 'utf-8' })
  return JSON.parse(content)
}

// baseid で指定された商品を除いた商品の中からランダムに 3 つ選んで返す
export const getRecommends = async (baseid) => {
  const products = await loadProducts()
  const candidates = products.filter((product) => product.id !== baseid)
  // return randomSelect(candidates, 3)
  // 2秒経過してから実現値が得られない Promise を返す
  return new Promise((resolve) => {
    setTimeout(() => resolve(randomSelect(candidates, 3)), 2000)
  })
}

// 渡された配列から 1 個以上 n 個以下の要素をランダムに抽出する
const randomSelect = (array, n) => {
  const indices = Array.from({ length: array.length }, (_, i) => i)
  indices.sort(() => Math.random() - 0.5)
  const count = Math.floor(Math.random() * n + 1)
  return Array.from({ length: count }, (_, i) => array[indices[i]])
}
