/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Database } from '../readDbFile/readDbFile'
import { writeToIndexedDb, getIndexedDbEntry } from '../manageIndexedDb/manageIndexedDb'
import { WordEntry } from '../classes/WordEntry'
import { LookUp } from '../classes/LookUp'
import { getMeaning } from '../func/apiRequest'

export async function importDbFile(filePath: Blob) {
  const db = new Database()
  let lookUps: any = await db.readTable(filePath, 'LOOKUPS')
  const bookInfo: any = await db.readTable(filePath, 'BOOK_INFO')
  let words: any = await db.readTable(filePath, 'WORDS')

  const wordEntries: WordEntry[] = []
  lookUps.forEach((item: LookUp) => {
    wordEntries.push(new WordEntry(item))
  })

  const p1 = writeToIndexedDb(wordEntries, 'database', 'lookUps', false).catch(err => console.log(err))
  const p2 = writeToIndexedDb(bookInfo, 'database', 'bookInfo', false).catch(err => console.log(err))
  const p3 = writeToIndexedDb(words, 'database', 'words', false).catch(err => console.log(err))

  await Promise.all([p1, p2, p3])

  words.forEach(element => {
    getMeaning(element)
      .then(res => {
        getIndexedDbEntry('database', 'words', res.id)
          .then(entry => {
            entry.meaning = res.meaning
            writeToIndexedDb([entry], 'database', 'words', true)
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  })
}
