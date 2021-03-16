import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { DatabaseStateInterface, WordsInterface } from './state'
import { getFormatedEntries } from '../../core/func/formatEntries'
import { writeToIndexedDb } from '../../core/func/manageIndexedDb'

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
  createDeck: async ({ commit, state }, deckInfo) => {
    console.log('create deck action')
    deckInfo.id = Date.now()
    await writeToIndexedDb([deckInfo], 'database', 'decks')
    commit('createDeck', deckInfo)
  }
}

export default actions
