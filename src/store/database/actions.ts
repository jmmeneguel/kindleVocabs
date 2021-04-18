import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { DatabaseStateInterface, Deck, WordsInterface } from './state'
import {
  getFormatedEntries,
  getVocabsInDeck
} from '../../core/func/formatEntries'
import { writeToIndexedDb } from '../../core/func/manageIndexedDb'
import { TrainingData } from '../../core/classes/TrainingData'

const actions: ActionTree<DatabaseStateInterface, StateInterface> = {
  updateState: async ({ commit, state }) => {
    const newState = await getFormatedEntries()
    commit('updateState', newState)
  },

  hideItem: ({ commit, state }, id: string) => {
    const wordIds = state.words.map((item: WordsInterface) => item.id)
    const ind = wordIds.indexOf(id)
    commit('hideItem', ind)
  },

  updateItem: ({ commit, state }, editedItem: WordsInterface) => {
    const ind = state.words.findIndex(
      (item: WordsInterface) => item.id === editedItem.id
    )
    commit('updateItem', { ind, editedItem })
  },

  createDeck: async (
    { commit, state },
    data: { deckInfo: Deck; create: boolean }
  ) => {
    if (!('id' in data.deckInfo)) {
      data.deckInfo.id = Date.now()
    }

    writeToIndexedDb([data.deckInfo], 'database', 'decks', true)

    const deckInfo = getVocabsInDeck(data.deckInfo, state.words)

    let ind = -1
    if (!data.create) {
      const deckIds = state.decks.map((item: Deck) => item.id)
      ind = deckIds.indexOf(data.deckInfo.id)
    }
    commit('createDeck', { deckInfo: deckInfo, ind })
  },

  updateTrainingWord: async ({ commit, state }, userGrade: number) => {
    if (userGrade !== -1) {
      const trainingData = new TrainingData(
        JSON.parse(JSON.stringify(state.trainer.currentWord.trainingData[0]))
      )
      trainingData.addAttempt(userGrade)

      writeToIndexedDb([trainingData], 'database', 'trainingData', true)

      const indTrainingSet = state.trainer.trainingSet.findIndex(
        item => item.id === state.trainer.currentWord.id
      )
      const indAllWords = state.trainer.allWords.findIndex(
        item => item.id === state.trainer.currentWord.id
      )
      if (trainingData.interval > 0) {
        commit('removeWordFromTrainingSet', indTrainingSet)
      } else {
        const updatedWord = JSON.parse(
          JSON.stringify(state.trainer.currentWord)
        )
        updatedWord.trainingData = [trainingData]
        commit('updateWord', {
          editedWord: updatedWord,
          indTrainingSet,
          indAllWords
        })
      }
    }
    commit('updateTrainingWord')
  }
}

export default actions
