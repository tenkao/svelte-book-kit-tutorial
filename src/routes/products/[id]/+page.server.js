// 商品データをページコンポーネントに渡す処理

// 商品データをデータベースから取得する（仮）
const getProductFromDatabase = async () => {
  return {
    id: 'svelte-book',
    name: 'Svelte Book',
    price: 3500,
    images: [
      'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-1.png',
      'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-2.png',
      'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-3.png',
    ],
  }
}

// 関連商品データをデータベースから取得する（仮）
const getRelatedProductsFromDatabase = async () => {
  return [
    {
      id: 'react-book',
      name: 'React Book',
      price: 3500,
      images: [
        'https://github.com/svelte-book/sample-app/raw/main/static/react-book-1.png',
      ],
    },
    {
      id: 'vue-book',
      name: 'Vue Book',
      price: 3500,
      images: [
        'https://github.com/svelte-book/sample-app/raw/main/static/vue-book-1.png',
      ],
    },
    {
      id: 'angular-book',
      name: 'Angular Book',
      price: 3500,
      images: [
        'https://github.com/svelte-book/sample-app/raw/main/static/angular-book-1.png',
      ],
    },
  ]
}

// 商品データをページコンポーネントに渡す
// load という名前の関数をエクスポートしている場合、このルートへのアクセスがあった際に自動でサーバーサイドで実行され、
// 戻り値を data という名前のプロパティとしてページコンポーネントに渡す
export const load = async () => {
  // 商品データをデータベースから取得する
  const product = await getProductFromDatabase()

  // 関連商品データをデータベースから取得する
  const relatedProducts = await getRelatedProductsFromDatabase()

  // 商品データと関連商品データを返す
  return { product, relatedProducts }
}
