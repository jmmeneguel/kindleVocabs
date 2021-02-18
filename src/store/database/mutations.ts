import { MutationTree } from 'vuex'
import { databaseStateInterface } from './state'

const mutation: MutationTree<databaseStateInterface> = {
  updateState (state: databaseStateInterface, newState: databaseStateInterface[]) {
    state.words = newState.words
    state.books = newState.books
  }
}

export default mutation
