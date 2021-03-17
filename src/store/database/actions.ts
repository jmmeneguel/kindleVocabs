import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { DatabaseStateInterface, Deck, WordsInterface } from './state'
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
  createDeck: async (
    { commit, state },
    data: { deckInfo: Deck; create: boolean }
  ) => {
    if (!('id' in data.deckInfo)) {
      data.deckInfo.id = Date.now()
    }

    await writeToIndexedDb([data.deckInfo], 'database', 'decks', true)
    let ind = -1
    if (!data.create) {
      const deckIds = state.decks.map((item: Deck) => item.id)
      ind = deckIds.indexOf(data.deckInfo.id)
    }
    commit('createDeck', { deckInfo: data.deckInfo, ind })
  }
}

export default actions
