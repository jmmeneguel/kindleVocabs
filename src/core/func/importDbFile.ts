import { writeToIndexedDb, getIndexedDbEntry } from './manageIndexedDb'
import { LookUp, lookUpInterface } from '../classes/LookUp'
import { Word, wordInterface } from '../classes/Word'
import { TrainingData, trainingDataInterface } from '../classes/TrainingData'
import { Database, kindleLookUpType, kindleWordType, kindleBookInfoType } from './readDbFile'

export async function importDbFile (filePath: Blob) {
  const db = new Database()
  const lookUps: kindleLookUpType[] = <kindleLookUpType[]> await db.readTable(filePath, 'LOOKUPS')
  const bookInfo: kindleBookInfoType[] = <kindleBookInfoType[]> await db.readTable(filePath, 'BOOK_INFO')
  const words: kindleWordType[] = <kindleWordType[]> await db.readTable(filePath, 'WORDS')

  const lookUpEntries: lookUpInterface[] = []
  lookUps.forEach((item) => {
    const element: lookUpInterface = {
      id: item.id,
      wordId: item.word_key,
      bookId: item.book_key,
      context: item.usage,
      timestamp: new Date(item.timestamp)
    }
    lookUpEntries.push(new LookUp(element))
  })

  const wordEntries: Word[] = []
  const trainingDataEntries: TrainingData[] = []
  words.forEach((item: wordInterface) => {
    wordEntries.push(new Word(item))
    const trainingDataData: trainingDataInterface = { id: item.id }
    trainingDataEntries.push(new TrainingData(trainingDataData))
  })

  const p1 = writeToIndexedDb(lookUpEntries, 'database', 'lookUps', false).catch(err => console.log(err))
  const p2 = writeToIndexedDb(bookInfo, 'database', 'bookInfo', false).catch(err => console.log(err))
  const p3 = writeToIndexedDb(wordEntries, 'database', 'words', false).catch(err => console.log(err))
  const p4 = writeToIndexedDb(trainingDataEntries, 'database', 'trainingData', false).catch(err => console.log(err))

  await Promise.all([p1, p2, p3, p4])

  getIndexedDbEntry('database', 'words', 'lang', 'de')
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
