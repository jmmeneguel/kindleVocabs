/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Database } from '../readDbFile/readDbFile'
import { writeToIndexedDb } from '../manageIndexedDb/manageIndexedDb'
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

  writeToIndexedDb(wordEntries, 'database', 'lookUps', false).catch(err => console.log(err))
  writeToIndexedDb(bookInfo, 'database', 'bookInfo', false).catch(err => console.log(err))
  writeToIndexedDb(words, 'database', 'words', false).catch(err => console.log(err))

  getMeaning(words[0]).then(res => console.log(res)).catch(err => console.log(err))
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
