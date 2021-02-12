import { WordInfo } from './WordInfo'
import { kindleWordType } from '../readDbFile/readDbFile'

export class Word {
  id: string
  word: string
  stem: string
  lang: string
  wordInfo: WordInfo

  constructor (word: kindleWordType) {
    this.id = word.id
    this.word = word.word
    this.stem = word.stem
    this.lang = word.lang
    this.wordInfo = null
  }
}
