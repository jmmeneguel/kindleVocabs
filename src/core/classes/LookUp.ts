/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { kindleLookUpType } from '../readDbFile/readDbFile'
export class LookUp {
  id: string
  wordId: string
  bookId: string
  context: string
  timestamp: Date

  constructor (lookUp: kindleLookUpType) {
    this.id = lookUp.id
    this.wordId = lookUp.word_key
    this.bookId = lookUp.book_key
    this.context = lookUp.usage
    this.timestamp = new Date(lookUp.timestamp)
  }
}
