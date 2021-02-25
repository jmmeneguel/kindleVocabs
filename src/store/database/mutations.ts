import { MutationTree } from 'vuex'
import { databaseStateInterface } from './state'

const mutation: MutationTree<databaseStateInterface> = {
  updateState (state: databaseStateInterface, newState: databaseStateInterface[]) {
    state.words = newState.words
    state.books = newState.books
  },
  hideItem (state: databaseStateInterface, ind: number) {
    const hiddenElement = state.words[ind]
    hiddenElement.hidden = true
    state.words.splice(ind, 1, hiddenElement);
  },
  updateItem (state: databaseStateInterface, data) {
    state.words.splice(data.ind, 1, data.editedItem);
  }
}

export default mutation
