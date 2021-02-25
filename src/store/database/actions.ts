/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { DatabaseStateInterface } from './state'
import { getFormatedEntries } from '../../core/func/formatEntries'

const actions: ActionTree<DatabaseStateInterface, StateInterface> = {
  async updateState() {
    const newState = await getFormatedEntries()
    this.commit('databaseModule/updateState', newState)
  },
  hideItem({ commit, state }, id) {
    const wordIds = state.words.map(item => item.id)
    const ind = wordIds.indexOf(id)
    commit('databaseModule/hideItem', ind)
  },
  updateItem({ commit, state }, editedItem) {
    const ind = state.words.findIndex(item => item.id === editedItem.id)
    commit('databaseModule/updateItem', { ind, editedItem })
  }
}

export default actions
