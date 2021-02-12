/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Database } from '../readDbFile/readDbFile'
import { writeToIndexedDb, getIndexedDbEntry } from '../manageIndexedDb/manageIndexedDb'
import { LookUp } from '../classes/LookUp'
import { Word } from '../classes/Word'
import { TrainingData } from '../classes/TrainingData'
import { getMeaning } from '../func/apiRequest'

export async function importDbFile(filePath: Blob) {
  const db = new Database()
  let lookUps: any = await db.readTable(filePath, 'LOOKUPS')
  const bookInfo: any = await db.readTable(filePath, 'BOOK_INFO')
  let words: any = await db.readTable(filePath, 'WORDS')

  const lookUpEntries: LookUp[] = []
  lookUps.forEach((item: LookUp) => {
    lookUpEntries.push(new LookUp(item))
  })

  const wordEntries: Word[] = []
  const trainingDataEntries: TrainingData[] = []
  words.forEach((item: Word) => {
    wordEntries.push(new Word(item))
    trainingDataEntries.push(new TrainingData(item.id))
  })

  const p1 = writeToIndexedDb(lookUpEntries, 'database', 'lookUps', false).catch(err => console.log(err))
  const p2 = writeToIndexedDb(bookInfo, 'database', 'bookInfo', false).catch(err => console.log(err))
  const p3 = writeToIndexedDb(wordEntries, 'database', 'words', false).catch(err => console.log(err))
  const p4 = writeToIndexedDb(trainingDataEntries, 'database', 'trainingData', false).catch(err => console.log(err))

  await Promise.all([p1, p2, p3, p4])

  getIndexedDbEntry('database', 'words', 'lang', 'de')
    .then(res => console.log(res))
    .catch(err => console.log(err))

  // words.forEach(element => {
  //   getMeaning(element)
  //     .then(res => {
  //       getIndexedDbEntry('database', 'words', res.id)
  //         .then(entry => {
  //           entry.meaning = res.meaning
  //           writeToIndexedDb([entry], 'database', 'words', true)
  //             .catch(err => console.log(err))
  //         })
  //         .catch(err => console.log(err))
  //     })
  //     .catch(err => console.log(err))
  // })
}
