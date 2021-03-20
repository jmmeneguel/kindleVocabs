import { MutationTree } from 'vuex'
import { Deck, WordsInterface } from '../database/state'
import { AppStateInterface } from './state'

function compareTrainingData(
  a: { trainingData: { attemptHistory: []; interval: number }[] },
  b: { trainingData: { attemptHistory: []; interval: number }[] }
) {
  const a_nextAttempt =
    a.trainingData[0].attemptHistory[-1] ||
    Date.now() + 8.64e7 * a.trainingData[0].interval
  const b_nextAttempt =
    b.trainingData[0].attemptHistory[-1] ||
    Date.now() + 8.64e7 * b.trainingData[0].interval
  return a_nextAttempt - b_nextAttempt
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

function getTrainingSet(
  deckConfig: { newWordsPerDay: any; reviewsPerDay: any },
  allWords: any
) {
  let newWords = []
  let reviews = []

  for (const word of allWords) {
    if (word.trainingData[0].attemptHistory.length === 0) {
      newWords.push(word)
    } else {
      reviews.push(word)
    }
  }

  const newWordsPerDay = deckConfig.newWords
  const reviewsPerDay = deckConfig.reviews

  // TODO: check if sort order is correct
  newWords = newWords.sort(compareTrainingData).slice(0, newWordsPerDay)
  reviews = reviews.sort(compareTrainingData).slice(0, reviewsPerDay)

  const trainingSubset = newWords.concat(reviews)
  shuffle(trainingSubset)

  console.log('trainingSet length', trainingSubset.length)
  return trainingSubset
}

const mutation: MutationTree<AppStateInterface> = {
  updateTrainerCurrentDeck(state: AppStateInterface, deck: Deck) {
    state.trainer.currentDeck = deck
  },

  updateTrainingWord(state) {
    console.log('state.trainer.trainingSet', state.trainer.trainingSet.length)
    const currentWord =
      state.trainer.trainingSet[
        Math.floor(Math.random() * state.trainer.trainingSet.length)
      ]

    state.trainer.currentWord = currentWord
  },

  removeWordFromTrainingSet(state, ind) {
    console.log('remove word')
    state.trainer.trainingSet.splice(ind, 1)
  },

  updateWord(
    state: AppStateInterface,
    data: {
      indTrainingSet: number
      indAllWords: number
      editedWord: WordsInterface
    }
  ) {
    state.trainer.trainingSet.splice(data.indTrainingSet, 1, data.editedWord)
    state.trainer.allWords.splice(data.indAllWords, 1, data.editedWord)
  },

  updateTrainingWords(state, items) {
    state.trainer.allWords = items
    state.trainer.trainingSet = getTrainingSet(state.trainer.currentDeck, items)
  }
}

export default mutation
