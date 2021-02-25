import { MutationTree } from 'vuex'
import { DatabaseStateInterface } from './state'

const mutation: MutationTree<DatabaseStateInterface> = {
  updateState(state: DatabaseStateInterface, newState: DatabaseStateInterface) {
    state.words = newState.words
    state.books = newState.books
  },
  hideItem(state: DatabaseStateInterface, ind: number) {
    const hiddenElement = state.words[ind]
    hiddenElement.hidden = true
    state.words.splice(ind, 1, hiddenElement)
  },
  updateItem(state: DatabaseStateInterface, data) {
    state.words.splice(data.ind, 1, data.editedItem)
  }
}

export default mutation
