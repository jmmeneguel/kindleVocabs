import { LookUp } from '../../core/classes/LookUp'
import { TrainingData } from '../../core/classes/TrainingData'
import { WordInfo } from '../../core/classes/WordInfo'
import { BookInfo } from '../../core/classes/BookInfo'

export interface WordsInterface {
  id: string
  word: string
  stem: string
  lang: string
  meaning: WordInfo[] | undefined
  lookUps: LookUp[]
  trainingData: TrainingData | undefined
  hidden: boolean
}

export interface DatabaseStateInterface {
  words: WordsInterface[]
  books: BookInfo[]
}

function state(): DatabaseStateInterface {
  return { words: [], books: [] }
}

export default state
