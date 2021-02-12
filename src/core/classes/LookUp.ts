/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { WordInfo } from './WordInfo'
import { kindleLookUpType } from '../readDbFile/readDbFile'
export class LookUp {
  id: string
  wordKey: string
  bookKey: string
  context: string
  timestamp: Date
  wordInfos: WordInfo[]

  constructor (lookUp: kindleLookUpType) {
    this.id = lookUp.id
    this.wordKey = lookUp.word_key
    this.bookKey = lookUp.book_key
    this.context = lookUp.usage
    this.timestamp = new Date(lookUp.timestamp)
    this.wordInfos = []
  }
}
