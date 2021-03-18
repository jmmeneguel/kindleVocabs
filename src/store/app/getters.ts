import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { AppStateInterface } from './state'

const getters: GetterTree<AppStateInterface, StateInterface> = {
  currentTrainerDeck: state => {
    return state.trainer.currentDeck
  },
  currentTrainerWord: state => {
    return state.trainer.currentWord
  }
}

export default getters
