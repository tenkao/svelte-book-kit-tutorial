// 商品データをデータベースに追加・更新するスクリプト

import { readFile } from 'fs/promises'
import * as dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

// .env の内容に process.env からアクセスできるようにする
dotenv.config()

// ファイル名を指定して JSON ファイルを読み込む
const readJSON = async (filename) => {
  const content = await readFile(filename, { encoding: 'utf-8' })
  return JSON.parse(content)
}

// JSON から商品データを読み込み、データベースに追加・更新する
const main = async () => {
  const client = new MongoClient(process.env.MONGODB_URI)
  const database = client.db()

  const productsData = await readJSON('data/products.json')
  for (const product of productsData) {
    console.log(`Seed products/${product.id}`)
    await database
      .collection('products')
      .updateOne(
        { _id: product.id },
        { $set: { ...product, _id: product.id } },
        { upsert: true }
      )
  }

  await client.close()
}

main()
