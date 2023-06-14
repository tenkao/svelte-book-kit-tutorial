// セッションの作成・保存を行うためのライブラリ

import { database } from '$lib/server/mongodb'

// セッションの有効期限
const expiresIn = 30 * 60 * 1000 // 30分

// セッションを作成する
export const createSession = async (data) => {
  const sessionId = crypto.randomUUID()
  const session = {
    _id: sessionId,
    expiresAt: Date.now() + expiresIn,
    ...data,
  }
  await database.collection('sessions').insertOne(session)
  return sessionId
}
