import { LookUp } from '../../core/classes/LookUp'
import { WordInterface } from 'src/core/classes/Word'
import { TrainingData } from '../../core/classes/TrainingData'
import { WordInfo } from '../../core/classes/WordInfo'
import { BookInfo } from '../../core/classes/BookInfo'

export interface Deck {
  id: number
  label: string
  wordIds: string[]
  newWordsPerDay: number
  reviewsPerDay: number
  languageFilter: []
  bookFilter: []
}

export interface WordsInterface {
  id: string
  word: string
  stem: string
  lang: string
  meaning: WordInfo[] | undefined
  lookUps: LookUp[]
  trainingData: TrainingData[]
  hidden: boolean
}

export interface DatabaseStateInterface {
  words: WordsInterface[]
  books: BookInfo[]
  decks: Deck[]
  trainer: {
    currentDeck: Deck
    currentWord: WordInterface
    allWords: WordInterface[]
    trainingSet: WordInterface[]
  }
}

function state(): DatabaseStateInterface {
  return {
    words: [],
    books: [],
    decks: [],
    trainer: {
      currentDeck: {
        id: 0,
        bookFilter: [],
        label: '',
        languageFilter: [],
        newWordsPerDay: 0,
        reviewsPerDay: 0,
        wordIds: []
      },
      currentWord: {
        id: '',
        lang: '',
        stem: '',
        word: ''
      },
      allWords: [],
      trainingSet: []
    }
  }
}

export default state
