<script>
  // +page.server.js の load 関数の戻り値
  export let data

  $: ({ products } = data)
</script>

<h1>カート</h1>

<ul>
  {#each products as product}
    <li>
      <a href="/products/{product.id}">
        <img src={product.images[0]} alt="" width="150" />
        {product.name}
      </a>
      - {product.price}円
    </li>
  {/each}
</ul>
