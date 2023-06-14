// Auth0 の　API を呼び出すためのライブラリ

import { env } from '$env/dynamic/private'

// ログインリンクをメールで送信する
export const sendPasswardlessLink = async (email, state, redirectUri) => {
  const res = await fetch(`https://${env.AUTH0_DOMAIN}/passwordless/start`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.AUTH0_CLIENT_ID,
      client_secret: env.AUTH0_CLIENT_SECRET,
      connection: 'email',
      email,
      send: 'link',
      authParams: {
        scope: 'openid profile email',
        state,
        response_type: 'code',
        redirect_uri: redirectUri,
      },
    }),
  })
  if (res.ok) {
    return await res.json()
  } else {
    console.error(await res.json())
    throw new Error('Auth0 API error')
  }
}

// リダイレクト URL で受け取った code を元にアクセストークンを発行する
export const getToken = async (code, redirectUri) => {
  const params = new URLSearchParams()
  params.set('grant_type', 'authorization_code')
  params.set('client_id', env.AUTH0_CLIENT_ID)
  params.set('client_secret', env.AUTH0_CLIENT_SECRET)
  params.set('code', code)
  params.set('redirect_uri', redirectUri)
  const res = await fetch(`https://${env.AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })
  if (res.ok) {
    return await res.json()
  } else {
    console.error(await res.json())
    throw new Error('Auth0 API error')
  }
}

// アクセストークンを元にログインユーザーの詳細情報を取得する
export const getProfile = async (token) => {
  const res = await fetch(`https://${env.AUTH0_DOMAIN}/userinfo`, {
    headers: {
      authorization: `Bearer ${token.access_token}`,
    },
  })
  if (res.ok) {
    return await res.json()
  } else {
    console.error(await res.json())
    throw new Error('Auth0 API error')
  }
}
