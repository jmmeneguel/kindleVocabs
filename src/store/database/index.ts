import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { DatabaseStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const databaseModule: Module<DatabaseStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default databaseModule
