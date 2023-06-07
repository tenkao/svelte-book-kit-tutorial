// おすすめ商品 サーバールート

import { getRecommends } from '$lib/server/product'
import { json } from '@sveltejs/kit'

// Get /api/recommend でアクセスされたときの処理
// おすすめ商品を取得して JSON で返す
export const GET = async ({ url }) => {
  const recommends = await getRecommends(url.searchParams.get('id'))
  return json(recommends)
}
