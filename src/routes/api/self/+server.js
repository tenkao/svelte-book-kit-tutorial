import { json } from '@sveltejs/kit'

// ログイン中のユーザー情報を取得する API
export const GET = ({ locals }) => {
  if (!locals.currentUser) {
    return json(null)
  }
  return json({ email: locals.currentUser.email })
}
