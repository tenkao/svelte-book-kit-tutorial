import { findSession } from '$lib/server/session'

// hadle フック - 全てのページ、フォームアクション、サーバールートなどが実行される前に呼び出される
export const handle = async ({ event, resolve }) => {
  // ログイン状況の判定（セッションからユーザー情報を取得する）
  const sessionId = event.cookies.get('svelte_ec_session')
  event.locals.currentUser = await findSession(sessionId)

  return await resolve(event)
}
