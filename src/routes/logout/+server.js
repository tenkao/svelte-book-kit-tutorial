import { redirect } from '@sveltejs/kit'
import { deleteSession } from '$lib/server/session'

// ログアウト機能
export const GET = async ({ cookies }) => {
  // セッション ID を取得する
  const sessionId = cookies.get('svelte_ec_session')

  // セッション情報、Cookie を削除する
  if (sessionId) {
    await deleteSession(sessionId)
    cookies.delete('svelte_ec_session', { path: '/' })
  }

  throw redirect(302, '/products/svelte-book')
}
