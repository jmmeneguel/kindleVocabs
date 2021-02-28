import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { DatabaseStateInterface, WordsInterface } from './state'
import { getFormatedEntries } from '../../core/func/formatEntries'

const actions: ActionTree<DatabaseStateInterface, StateInterface> = {
  async updateState() {
    const newState = await getFormatedEntries()
    this.commit('databaseModule/updateState', newState)
  },
  hideItem({ commit, state }, id: string) {
    const wordIds = state.words.map((item: WordsInterface) => item.id)
    const ind = wordIds.indexOf(id)
    commit('hideItem', ind)
  },
  updateItem({ commit, state }, editedItem: WordsInterface) {
    const ind = state.words.findIndex(
      (item: WordsInterface) => item.id === editedItem.id
    )
    commit('updateItem', { ind, editedItem })
  }
}

export default actions
