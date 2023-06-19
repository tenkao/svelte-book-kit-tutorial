// 商品データをページコンポーネントに渡す処理

import { loadProducts } from '$lib/server/product.js'

// プリレンダリングの指定
export const prerender = true

// 商品データをデータベースから取得する
const getProductFromDatabase = async (productId) => {
  const products = await loadProducts()
  return products.find((product) => product.id === productId)
}

// 関連商品データをデータベースから取得する
const getRelatedProductsFromDatabase = async (productId) => {
  const products = await loadProducts()
  return products.filter((product) => product.id !== productId)
}

// 商品データをページコンポーネントに渡す
// load という名前の関数をエクスポートしている場合、このルートへのアクセスがあった際に自動でサーバーサイドで実行され、
// 戻り値を data という名前のプロパティとしてページコンポーネントに渡す
export const load = async ({ locals, params }) => {
  // [id] の部分（パラメータ）を取得する
  const productId = params.id

  // 商品データをデータベースから取得する
  const product = await getProductFromDatabase(productId)

  // 関連商品データをデータベースから取得する
  const relatedProducts = await getRelatedProductsFromDatabase(productId)

  // 商品データと関連商品データを返す
  return { product, relatedProducts }
}
