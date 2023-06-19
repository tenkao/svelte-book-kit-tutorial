<script>
  // +page.server.js の load 関数の戻り値
  export let data
</script>

<h1>カート</h1>

{#if data.cart.length > 0}
  <ul>
    {#each data.cart as item}
      <li>
        <a href="/products/{item.id}">
          <img src={item.images[0]} alt="" width="120" />
          {item.name}
        </a>
        - {item.price}円
        <form action="?/remove" method="POST">
          <input type="hidden" name="productId" value={item.id} />
          <button>削除</button>
        </form>
      </li>
    {/each}
  </ul>
{:else}
  <div>カートは空です。</div>
{/if}
