import { gellAllKeys, getIndexedDbEntry } from './manageIndexedDb'
import { Word } from '../classes/Word'
import { BookInfo } from '../classes/BookInfo'
import { LookUp } from '../classes/LookUp'
import { TrainingData } from '../classes/TrainingData'
import { WordsInterface } from '../../store/database/state'

export async function getFormatedEntries () {
  const words: Word[] = <Word[]> await gellAllKeys('database', 'words')
  const books: BookInfo[] = <BookInfo[]> await gellAllKeys('database', 'bookInfo')
  const entries = []
  for (const item of words) {
    const entry: WordsInterface = {
      id: item.id,
      word: item.word,
      stem: item.stem,
      lang: item.lang,
      meaning: item.wordInfo,
      hidden: item.hidden,
      lookUps: [],
      trainingData: undefined
    }
    const p1 = getIndexedDbEntry('database', 'lookUps', 'wordId', item.id)
    const p2 = getIndexedDbEntry('database', 'trainingData', 'id', item.id)

    const res = await Promise.all([p1, p2])
    entry.lookUps = <LookUp[]> res[0]
    entry.trainingData = <TrainingData><unknown> res[1][0]
    entries.push(entry)
  }
  return {
    words: entries,
    books: books
  }
}
