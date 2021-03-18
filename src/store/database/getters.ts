import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { DatabaseStateInterface, WordsInterface } from './state'
import { LookUp } from '../../core/classes/LookUp'
import { getFilteredWords } from '../../core/func/formatEntries'

export interface SelectionOptionInterface {
  value: string
  label: string
}

const getters: GetterTree<DatabaseStateInterface, StateInterface> = {
  filteredEntries: state => (filters: {
    bookFilter: SelectionOptionInterface[]
    languageFilter: SelectionOptionInterface[]
  }): DatabaseStateInterface => {
    return {
      words: getFilteredWords(state.words, filters),
      books: state.books,
      decks: []
    }
  },
  bookOptions: state => {
    const bookOptions: { label: string; value: string }[] = []
    state.books.forEach(item => {
      bookOptions.push({
        label: item.title,
        value: item.id
      })
    })
    return bookOptions
  },
  languageOptions: () => {
    return [
      {
        label: 'English',
        value: 'en'
      },
      {
        label: 'German',
        value: 'de'
      },
      {
        label: 'Portuguese',
        value: 'pt'
      }
    ]
  },
  decks: state => {
    return state.decks
  },
  books: state => {
    return state.books
  }
}

export default getters
