// 商品データをページコンポーネントに渡す処理

import { loadProducts } from '$lib/server/product.js'
import { addToCart, loadCart } from '$lib/server/cart'

// 商品データをデータベースから取得する（仮）
const getProductFromDatabase = async (productId) => {
  const products = await loadProducts()
  return products.find((product) => product.id === productId)
}

// 関連商品データをデータベースから取得する（仮）
const getRelatedProductsFromDatabase = async (productId) => {
  const products = await loadProducts()
  return products.filter((product) => product.id !== productId)
}

// 商品データをページコンポーネントに渡す
// load という名前の関数をエクスポートしている場合、このルートへのアクセスがあった際に自動でサーバーサイドで実行され、
// 戻り値を data という名前のプロパティとしてページコンポーネントに渡す
export const load = async ({ params }) => {
  // [id] の部分（パラメータ）を取得する
  const productId = params.id

  // 商品データをデータベースから取得する
  const product = await getProductFromDatabase(productId)

  // 関連商品データをデータベースから取得する
  const relatedProducts = await getRelatedProductsFromDatabase(productId)

  // カートのデータを取得する
  const cart = await loadCart()

  // 商品データと関連商品データを返す
  return { product, relatedProducts, cart }
}

// フォームアクション
export const actions = {
  // POST /products/[id]/ でアクセスされたときの処理
  // フォームから送信されたデータを取得し、カートに追加する
  default: async ({ request }) => {
    const data = await request.formData()
    await addToCart(data.get('productId'))
  },
}
