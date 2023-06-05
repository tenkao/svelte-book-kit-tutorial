// 商品データをページコンポーネントに渡す処理

const loadProducts = async () => {
  return [
    {
      id: 'svelte-book',
      name: 'Svelte Book',
      price: 3500,
      images: [
        'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-1.png',
        'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-2.png',
        'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-3.png',
      ],
    },
    {
      id: 'react-book',
      name: 'React Book',
      price: 3500,
      images: [
        'https://github.com/svelte-book/sample-app/raw/main/static/react-book-1.png',
        'https://github.com/svelte-book/sample-app/raw/main/static/react-book-2.png',
        'https://github.com/svelte-book/sample-app/raw/main/static/react-book-3.png',
      ],
    },
    {
      id: 'vue-book',
      name: 'Vue Book',
      price: 3500,
      images: [
        'https://github.com/svelte-book/sample-app/raw/main/static/vue-book-1.png',
        'https://github.com/svelte-book/sample-app/raw/main/static/vue-book-2.png',
        'https://github.com/svelte-book/sample-app/raw/main/static/vue-book-3.png',
      ],
    },
    {
      id: 'angular-book',
      name: 'Angular Book',
      price: 3500,
      images: [
        'https://github.com/svelte-book/sample-app/raw/main/static/angular-book-1.png',
        'https://github.com/svelte-book/sample-app/raw/main/static/angular-book-2.png',
        'https://github.com/svelte-book/sample-app/raw/main/static/angular-book-3.png',
      ],
    },
  ]
}

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

  // 商品データと関連商品データを返す
  return { product, relatedProducts }
}
