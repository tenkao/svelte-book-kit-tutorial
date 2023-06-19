// カート情報を取得する API

import { json } from '@sveltejs/kit'
import { loadCartItems } from '$lib/server/cart'

export const GET = async ({ locals }) => {
  let cart = []
  if (locals.currentUser) {
    cart = await loadCartItems(locals.currentUser.userId)
  }
  return json(cart)
}
