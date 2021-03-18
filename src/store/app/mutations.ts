import { MutationTree } from 'vuex'
import { Deck } from '../database/state'
import { AppStateInterface } from './state'
import getters from './getters'

const mutation: MutationTree<AppStateInterface> = {
  updateTrainerCurrentDeck(state: AppStateInterface, deck: Deck) {
    state.trainer.currentDeck = deck
  },
  updateTrainingWord(state, items) {
    state.trainer.currentWord = items[Math.floor(Math.random() * items.length)]
  }
}

export default mutation
