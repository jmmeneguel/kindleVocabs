import { PhoneticInfo } from './PhoneticInfo'
import { Meaning } from './Meaning'

export class WordInfo {
  word: string
  phoneticInfo: PhoneticInfo[]
  meaning: Meaning[]
  timestamp: Date

  constructor (word: string, phoneticInfo: PhoneticInfo[], meaning: Meaning[]) {
    this.word = word
    this.phoneticInfo = phoneticInfo
    this.meaning = meaning
    this.timestamp = new Date()
  }
}
