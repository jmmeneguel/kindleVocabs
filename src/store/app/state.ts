import { WordInterface } from 'src/core/classes/Word'
import { Deck } from '../database/state'

export interface AppStateInterface {
  trainer: {
    currentDeck: Deck
    currentWord: WordInterface
    allWords: WordInterface[]
    trainingSet: WordInterface[]
  }
}

function state(): AppStateInterface {
  return {
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
