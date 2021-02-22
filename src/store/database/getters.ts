import { WordInfo } from 'src/core/classes/WordInfo'
import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { databaseStateInterface } from './state'

interface entryInterface {
  word: string,
  stem: string,
  wordInfo: WordInfo[],
  context: string[],
  status: string
}

const getters: GetterTree<databaseStateInterface, StateInterface> = {
  formatedEntries (state): entryInterface[] {
    return state
  },
  bookOptions (state) {
    const bookOptions: string[] = []
    state.books.forEach(item => {
      bookOptions.push(item.title)
    })
    return bookOptions
  },
  languageOptions () {
    return ["English", "German", "Portuguese"]
  }
}

export default getters
