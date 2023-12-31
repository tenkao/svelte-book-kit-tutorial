<script>
  import { onMount } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import { enhance } from '$app/forms'
  import Slider from './Slider.svelte'

  // +page.server.js の load 関数の戻り値
  export let data

  // 商品詳細、関連商品、カートのデータを取得
  $: ({ product, relatedProducts } = data)

  let recommendRequest = new Promise(() => {})
  let userRequest = new Promise(() => {})
  let cart = []
  let cartOpen = false

  // afterNavitate() - コンポーネントのマウント時 or URL遷移時に実行される
  afterNavigate(() => {
    // おすすめ商品データを取得する
    recommendRequest = fetch(`/api/recommend?id=${product.id}`).then((res) => res.json())

    // ユーザー情報を取得する
    userRequest = fetch('/api/self').then((res) => res.json())
  })

  onMount(() => {
    loadCart()
  })

  const loadCart = async () => {
    cart = await fetch('/api/cart').then((res) => res.json())
  }

  const toggleCart = () => {
    cartOpen = !cartOpen
  }
</script>

<svelte:head>
  <meta name="twitter:card" content="summary" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$page.url} />
  <meta property="og:title" content={product.name} />
  <meta property="og:description" content={`${product.name} - ${product.price}円`} />
</svelte:head>

<header class="header">
  <a href="/" class="header-title">Svelte EC</a>
  <nav>
    <ul class="header-link">
      <li>
        ようこそ
        {#await userRequest then user}
          {#if user}
            {user.email} さん <a href="/logout">ログアウト</a>
          {:else}
            ゲストさん <a href="/login">ログイン</a>
          {/if}
        {/await}
      </li>
      <li class="cart">
        <a href="/cart" on:click|preventDefault={toggleCart}>
          カート
          {#if cart.length > 0}
            ({cart.length})
          {/if}
        </a>
        {#if cartOpen}
          <div class="cart-detail">
            {#if cart.length > 0}
              <ul>
                {#each cart as item}
                  <li>
                    <a href="/products/{item.id}">{item.name}</a>
                    - {item.price}円
                  </li>
                {/each}
              </ul>
            {:else}
              <div>カートは空です。</div>
            {/if}
            <a href="/cart">詳細</a>
          </div>
        {/if}
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
        {#if !cart.find((item) => item.id === product.id)}
          <form
            method="POST"
            action="/cart?/add"
            use:enhance={() => {
              // フォームを送信し、完了したらカートの情報を更新する
              //   use:enhance に渡された関数は、フォームの送信の直前に呼び出される
              //   フォーム送信が完了すると、返り値の関数が呼び出される
              return async ({ update }) => {
                // update を呼び出すと SvelteKit デフォルトの挙動を実行させられる
                // （フォーム送信後の関数を返す場合、SvelteKit デフォルトの挙動は実行されない）
                await update()
                await loadCart()
              }
            }}
          >
            <input type="hidden" name="productId" value={product.id} />
            {#await userRequest}
              <button>カートに入れる</button>
            {:then user}
              <button disabled={!user}>カートに入れる</button>
              {#if !user}
                <p>カートを使うには<a href="/login">ログイン</a>してください。</p>
              {/if}
            {/await}
          </form>
        {:else}
          <button disabled>カート追加済み</button>
        {/if}
      </div>
    </div>
  </div>
  <footer>
    <h3>おすすめ商品</h3>
    {#await recommendRequest}
      <div>ロード中…</div>
    {:then products}
      <ul>
        {#each products as product}
          <li>
            <a href="/products/{product.id}">{product.name}</a>
            - {product.price} 円
          </li>
        {/each}
      </ul>
    {:catch}
      <div>読み込みエラー</div>
    {/await}
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

  .cart {
    position: relative;
  }

  .cart-detail {
    position: absolute;
    right: 0;
    top: 100%;
    width: 250px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid gray;
  }
</style>
