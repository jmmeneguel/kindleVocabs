import { MutationTree } from 'vuex'
import { DatabaseStateInterface, Deck, WordsInterface } from './state'
import Vue from 'vue'

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
  createDeck(
    state: DatabaseStateInterface,
    res: { deckInfo: Deck; ind: number }
  ) {
    if (res.ind === -1) {
      state.decks.push(res.deckInfo)
    } else {
      state.decks.splice(res.ind, 1, res.deckInfo)
    }
  }
}

export default mutation
