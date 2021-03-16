import { MutationTree } from 'vuex'
import { DatabaseStateInterface, WordsInterface } from './state'

const mutation: MutationTree<DatabaseStateInterface> = {
  updateState(state: DatabaseStateInterface, newState: DatabaseStateInterface) {
    state.words = newState.words
    state.books = newState.books
    state.decks = newState.decks
  },
  hideItem(state: DatabaseStateInterface, ind: number) {
    const hiddenElement = state.words[ind]
    hiddenElement.hidden = true
    state.words.splice(ind, 1, hiddenElement)
  },
  updateItem(
    state: DatabaseStateInterface,
    data: { ind: number; editedItem: WordsInterface }
  ) {
    state.words.splice(data.ind, 1, data.editedItem)
  },
  createDeck(state: DatabaseStateInterface, deckInfo) {
    state.decks.push(deckInfo)
  }
}

export default mutation
