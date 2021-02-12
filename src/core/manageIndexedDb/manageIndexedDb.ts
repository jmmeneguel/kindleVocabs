/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { openDB } from 'idb'

const storeNames = ['lookUps', 'bookInfo', 'words']

async function getDb (dbName: string) {
  return await openDB(dbName, 1, {
    upgrade (db: { createObjectStore: (arg0: string) => any }) {
      // Create a store of objects
      storeNames.forEach(storeName => {
        db.createObjectStore(storeName)
      })
    }
  })
}

export async function writeToIndexedDb (data: any, dbName: string, storeName: string, replace = false) {
  const putPromises: any[] = []

  const db = await getDb(dbName)

  data.forEach((item: any) => {
    let promise
    if (replace) {
      promise = db.put(storeName, item, item.id)
      putPromises.push(promise)
    } else {
      try {
        promise = db.add(storeName, item, item.id)
        putPromises.push(promise)
      } catch {
        console.log('won\'t replace')
      }
    }
  })

  await Promise.all(putPromises).catch(err => console.log(err))
}

export async function getIndexedDbEntry (dbName: string, storeName:string, key: string) {
  const db = await getDb(dbName)
  const store = db.transaction(storeName).objectStore(storeName)
  const value = await store.get(key)
  return value
}
