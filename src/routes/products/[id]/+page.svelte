<script>
  import Slider from './Slider.svelte'

  // 商品詳細の変数
  let product = {
    id: 'svelte-book',
    name: 'Svelte Guide',
    price: 3500,
    images: [
      'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-1.png',
      'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-2.png',
      'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-3.png',
    ],
  }

  // 関連商品の配列
  let relatedProducts = [
    { id: 'react-book', name: 'React Book', price: 3500 },
    { id: 'vue-book', name: 'Vue Book', price: 3500 },
    { id: 'angular-book', name: 'Angular Book', price: 3500 },
  ]

  // カートに入っている商品IDの配列
  let cart = []

  // カートに商品を追加する関数
  function addToCart(productId) {
    cart = [...cart, productId]
  }
</script>

<header class="header">
  <a href="/" class="header-title">Svelte EC</a>
  <nav>
    <ul class="header-link">
      <li>ようこそゲストさん</li>
      <li>
        <a href="/cart">カート (0)</a>
      </li>
    </ul>
  </nav>
</header>

<article class="product">
  <div class="product-main">
    <div class="image-container">
      <Slider images={product.images} />
    </div>
    <div>
      <h2>{product.name}</h2>
      <dl>
        <dt>価格</dt>
        <dd>{product.price}円</dd>
      </dl>
      <div>
        {#if !cart.includes(product.id)}
          <button on:click={() => addToCart(product.id)}>カートに入れる</button>
        {:else}
          <button disabled>カート追加済み</button>
        {/if}
      </div>
    </div>
  </div>
  <footer>
    <h3>関連商品</h3>
    <ul>
      {#each relatedProducts as product}
        <li>
          <a href="/products/{product.id}">{product.name}</a>
          - {product.price}円
        </li>
      {/each}
    </ul>
  </footer>
</article>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #eee;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    background-color: #fff;
    padding: 0 15px;
    width: 100%;
    max-width: 800px;
    height: 50px;
  }

  .header-title {
    font-weight: bold;
  }

  .header-link {
    display: flex;
    gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .product {
    margin: 0 auto;
    background-color: #fff;
    padding: 15px;
    width: 100%;
    max-width: 800px;
  }

  .product-main {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .image-container {
    width: 100%;
    max-width: 400px;
    overflow: hidden;
  }
</style>
