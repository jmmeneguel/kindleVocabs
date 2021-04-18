/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  writeToIndexedDb,
  getIndexedDbEntry,
  getAllKeys
} from './manageIndexedDb'
import { LookUp, lookUpInterface } from '../classes/LookUp'
import { Word, WordInterface } from '../classes/Word'
import { BookInfo, bookInfoInterface } from '../classes/BookInfo'
import { TrainingData, trainingDataInterface } from '../classes/TrainingData'
import {
  Database,
  kindleLookUpType,
  kindleWordType,
  kindleBookInfoType
} from './readDbFile'

export async function importDbFile(filePath: Blob) {
  const db = new Database()
  const p1 = db.readTable(filePath, 'LOOKUPS')
  const p2 = db.readTable(filePath, 'BOOK_INFO')
  const p3 = db.readTable(filePath, 'WORDS')
  const p4 = getAllKeys('database', 'lookUps')
  const p5 = getAllKeys('database', 'bookInfo')
  const p6 = getAllKeys('database', 'words')

  const res = await Promise.all([p1, p2, p3, p4, p5, p6])
  const lookUps = <kindleLookUpType[]>res[0]
  const bookInfo = <kindleBookInfoType[]>res[1]
  const words = <kindleWordType[]>res[2]
  const dbLookUps = <string[]>res[3]
  const dbBookInfo = <string[]>res[4]
  const dbWords = <string[]>res[5]

  const lookUpEntries: lookUpInterface[] = []
  lookUps.forEach((item: kindleLookUpType) => {
    if (!dbLookUps.includes(item.id)) {
      const element: lookUpInterface = {
        id: item.id,
        wordId: item.word_key,
        bookId: item.book_key,
        context: item.usage,
        timestamp: new Date(item.timestamp)
      }
      lookUpEntries.push(new LookUp(element))
    }
  })

  const wordEntries: Word[] = []
  const trainingDataEntries: TrainingData[] = []
  for (const item of words) {
    if (!dbWords.includes(item.id)) {
      const word = new Word(item)
      wordEntries.push(word)
      const trainingDataData: trainingDataInterface = { id: item.id }
      trainingDataEntries.push(new TrainingData(trainingDataData))
    } else {
      getIndexedDbEntry('database', 'words', 'id', item.id)
        .then(res => {
          const word = new Word(res[0])
        })
        .catch(err => console.log(err))
    }
  }

  const bookInfoEntries: bookInfoInterface[] = []
  bookInfo.forEach((item: kindleBookInfoType) => {
    if (!dbBookInfo.includes(item.id)) {
      bookInfoEntries.push(new BookInfo(item))
    }
  })

  const p7 = writeToIndexedDb(
    lookUpEntries,
    'database',
    'lookUps',
    false
  ).catch(err => console.log(err))
  const p8 = writeToIndexedDb(
    bookInfoEntries,
    'database',
    'bookInfo',
    false
  ).catch(err => console.log(err))
  const p9 = writeToIndexedDb(
    wordEntries,
    'database',
    'words',
    false
  ).catch(err => console.log(err))
  const p10 = writeToIndexedDb(
    trainingDataEntries,
    'database',
    'trainingData',
    false
  ).catch(err => console.log(err))

  await Promise.all([p7, p8, p9, p10])
}
