import {MongoClient, Db} from 'mongodb'
import * as dotenv from 'dotenv'

dotenv.config()

const dbName = process.env.MONGODB_DBNAME
const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const host = process.env.MONGODB_HOST
const port = process.env.MONGODB_PORT

const client = new MongoClient(`mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`)

export async function connectRepl(): Promise<Db|undefined> | never {
  try {
    return client.db('itb_repl')
  } catch(e: unknown) {
    console.log(e)
    await client.close()
  }
}

export default client