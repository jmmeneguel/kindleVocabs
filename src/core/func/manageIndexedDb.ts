/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { openDB } from 'idb'

async function getDb(dbName: string) {
  return await openDB(dbName, 1, {
    upgrade(db: { createObjectStore: (arg0: string) => any }) {
      // Create a store of objects
      const bookInfoStore = db.createObjectStore('bookInfo')
      bookInfoStore.createIndex('id', 'id')
      bookInfoStore.createIndex('lang', 'lang')

      const lookUpStore = db.createObjectStore('lookUps')
      lookUpStore.createIndex('id', 'id')
      lookUpStore.createIndex('wordId', 'wordId')
      lookUpStore.createIndex('bookId', 'bookId')
      lookUpStore.createIndex('timestamp', 'timestamp')

      const meaningStore = db.createObjectStore('words')
      meaningStore.createIndex('id', 'id')
      meaningStore.createIndex('lang', 'lang')

      const trainingDataStore = db.createObjectStore('trainingData')
      trainingDataStore.createIndex('id', 'id')
      trainingDataStore.createIndex('interval', 'interval')

      const decksDataStore = db.createObjectStore('decks')
      decksDataStore.createIndex('id', 'id')
    }
  })
}

export async function writeToIndexedDb(
  data: any,
  dbName: string,
  storeName: string,
  replace = false
) {
  const putPromises: any[] = []

  const db = await getDb(dbName)

  data.forEach((item: any) => {
    let promise
    if (replace) {
      promise = db.put(storeName, item, item.id)
      putPromises.push(promise)
    } else {
      promise = db.add(storeName, item, item.id).catch()
      putPromises.push(promise)
    }
  })

  await Promise.all(putPromises).catch(err => console.log(err))
}

export async function getAllKeys(dbName: string, storeName: string) {
  const db = await getDb(dbName)
  const values = await db.getAll(storeName)

  return values
}

export async function getIndexedDbEntry(
  dbName: string,
  storeName: string,
  indexName: string,
  key: string
) {
  const db = await getDb(dbName)
  const value = await db.getAllFromIndex(storeName, indexName, key)
  return value
}

export async function getEntryByKey(
  dbName: string,
  storeName: string,
  key: string
) {
  const db = await getDb(dbName)
  const store = db.transaction(storeName).objectStore(storeName)
  const value = await store.get(key)
  return value
}

export async function getAllTables() {
  const p1 = getAllKeys('database', 'words')
  const p2 = getAllKeys('database', 'lookUps')
  const p3 = getAllKeys('database', 'bookInfo')
  const p4 = getAllKeys('database', 'trainingData')

  await Promise.all([p1, p2, p3, p4])
    .then(res => {
      return res
    })
    .catch(err => console.log(err))
}

// async function updateTable(dbName: string, storeName: string) {
//   const data = await getAllKeys(dbName, storeName)
//   data.forEach((item: any) => {
//     item.hidden = false
//   })
//   await writeToIndexedDb(data, dbName, storeName, true)
// }
