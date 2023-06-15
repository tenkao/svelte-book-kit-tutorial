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

// セッション情報をデータベースから取得する
export const findSession = async (sessionId) => {
  const session = await database
    .collection('sessions')
    .findOne({ _id: sessionId })

  if (!session) {
    return null
  }

  // セッションの有効期限の確認
  if (session.expiresAt < Date.now()) {
    await deleteSession(session._id)
    return null
  }

  return session
}

// セッション情報をデータベースから削除する
export const deleteSession = async (sessionId) => {
  await database.collection('sessions').deleteOne({ _id: sessionId })
}
