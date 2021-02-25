import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { DatabaseStateInterface, WordsInterface } from './state'

const getters: GetterTree<DatabaseStateInterface, StateInterface> = {
  filteredEntries: state => (filters: {
    bookFilter: any[]
    languageFilter: any[]
  }): DatabaseStateInterface => {
    function filterBooks(value: WordsInterface) {
      if (filters.bookFilter.length === 0) {
        return true
      } else {
        const bookIds = value.lookUps.map(
          (item: { bookId: any }) => item.bookId
        )
        return filters.bookFilter.some((element: { value: any }) => {
          return bookIds.includes(element.value)
        })
      }
    }
    function filterLanguage(value: WordsInterface) {
      if (filters.languageFilter.length === 0) {
        return true
      } else {
        const languages: string[] = filters.languageFilter.map(
          (item: { value: any }) => item.value
        )
        return languages.includes(value.lang)
      }
    }

    function filterHidden(value: WordsInterface) {
      return !value.hidden
    }

    let filteredWords: WordsInterface[] = state.words.filter(filterLanguage)
    filteredWords = filteredWords.filter(filterBooks)
    filteredWords = filteredWords.filter(filterHidden)

    return {
      words: filteredWords,
      books: state.books
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
  }
}

export default getters
