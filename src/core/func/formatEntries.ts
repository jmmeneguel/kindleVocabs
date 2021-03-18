import { gellAllKeys, getIndexedDbEntry } from './manageIndexedDb'
import { Word } from '../classes/Word'
import { BookInfo } from '../classes/BookInfo'
import { LookUp } from '../classes/LookUp'
import { TrainingData } from '../classes/TrainingData'
import {
  DatabaseStateInterface,
  WordsInterface,
  Deck
} from '../../store/database/state'

export interface SelectionOptionInterface {
  value: string
  label: string
}

export async function getFormatedEntries(): Promise<DatabaseStateInterface> {
  const words: Word[] = <Word[]>await gellAllKeys('database', 'words')
  const books: BookInfo[] = <BookInfo[]>(
    await gellAllKeys('database', 'bookInfo')
  )

  const entries = []
  for (const item of words) {
    const entry: WordsInterface = {
      id: item.id,
      word: item.word,
      stem: item.stem,
      lang: item.lang,
      meaning: item.wordInfo,
      hidden: item.hidden,
      lookUps: [],
      trainingData: undefined
    }
    const p1 = getIndexedDbEntry('database', 'lookUps', 'wordId', item.id)
    const p2 = getIndexedDbEntry('database', 'trainingData', 'id', item.id)

    const res = await Promise.all([p1, p2])
    entry.lookUps = <LookUp[]>res[0]
    entry.trainingData = <TrainingData>(<unknown>res[1][0])
    entries.push(entry)
  }

  const decks: Deck[] = <Deck[]>await gellAllKeys('database', 'decks')
  const modifiedDecks = []
  for (const deck of decks) {
    const vocabs = getFilteredWords(entries, {
      bookFilter: deck.bookFilter,
      languageFilter: deck.languageFilter
    }).map(item => item.id)
    deck.wordIds = vocabs
    modifiedDecks.push(deck)
  }

  return {
    words: entries,
    books: books,
    decks: modifiedDecks
  }
}

export function getFilteredWords(
  words: WordsInterface[],
  filters: {
    bookFilter: SelectionOptionInterface[]
    languageFilter: SelectionOptionInterface[]
  }
): WordsInterface[] {
  function filterBooks(value: WordsInterface) {
    if (filters.bookFilter.length === 0) {
      return true
    } else {
      const bookIds = value.lookUps.map((item: LookUp) => item.bookId)
      return filters.bookFilter.some((element: SelectionOptionInterface) => {
        return bookIds.includes(element.value)
      })
    }
  }
  function filterLanguage(value: WordsInterface) {
    if (filters.languageFilter.length === 0) {
      return true
    } else {
      const languages: string[] = filters.languageFilter.map(
        (item: SelectionOptionInterface) => item.value
      )
      return languages.includes(value.lang)
    }
  }

  function filterHidden(value: WordsInterface) {
    return !value.hidden
  }

  let filteredWords: WordsInterface[] = words.filter(filterLanguage)
  filteredWords = filteredWords.filter(filterBooks)
  filteredWords = filteredWords.filter(filterHidden)

  return filteredWords
}
