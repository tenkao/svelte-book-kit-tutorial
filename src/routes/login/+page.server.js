import { fail } from '@sveltejs/kit'
import { sendPasswardlessLink } from '$lib/server/auth0'

// フォームアクション
export const actions = {
  // default - POST /login/ に対する処理
  default: async ({ cookies, request, url }) => {
    const data = await request.formData()
    const email = data.get('email')

    // メールアドレスが入力されているか検証する
    if (!email) {
      return fail(400, { email, error: 'missing' })
    }

    // 正しいメールアドレスのフォーマットであるか検証する
    // この正規表現は簡易版。実際の業務では必要に応じて正確な正規表現を使用すること
    if (!/^.+@.+$/.test(email)) {
      return fail(400, { email, error: 'invalid_format' })
    }

    // state - ログインのリクエストがこのページから送信されたことを確かめるためのランダムな文字列
    const state = crypto.randomUUID()
    const redirectUri = `${url.origin}/api/auth/callback`
    await sendPasswardlessLink(email, state, redirectUri)

    // state をクッキーに保存しておき、コールバックURLの処理で使用する（一致を検証する）
    cookies.set('state', state, { path: '/' })
    return { success: true }
  },
}
