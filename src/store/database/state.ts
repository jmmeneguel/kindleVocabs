import { LookUp } from '../../core/classes/LookUp'
import { TrainingData } from '../../core/classes/TrainingData'
import { WordInfo } from '../../core/classes/WordInfo'
import { BookInfo } from '../../core/classes/BookInfo'

export interface Deck {
  id: string
  label: string
  wordIds: string[]
  newWordsPerDay: number
  reviewsPerDay: number
  languages: string[]
  books: string[]
}

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
  decks: Deck[]
}

function state(): DatabaseStateInterface {
  return { words: [], books: [], decks: [] }
}

export default state
