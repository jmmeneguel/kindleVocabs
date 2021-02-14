import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { databaseStateInterface } from './state'

const getters: GetterTree<databaseStateInterface, StateInterface> = {
  allItems (state) {
    return state
  }
}

export default getters
