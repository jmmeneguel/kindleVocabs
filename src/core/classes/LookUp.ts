export interface lookUpInterface {
  id: string
  wordId: string
  bookId: string
  context: string
  timestamp: Date
}
export class LookUp {
  id: string
  wordId: string
  bookId: string
  context: string
  timestamp: Date

  constructor (lookUp: lookUpInterface) {
    this.id = lookUp.id
    this.wordId = lookUp.wordId
    this.bookId = lookUp.bookId
    this.context = lookUp.context
    this.timestamp = lookUp.timestamp
  }
}
