import { PhoneticInfo, phoneticInfoInterface } from './PhoneticInfo'
import { Meaning, meaningInterface } from './Meaning'

export interface wordInfoInterface {
  word: string
  phoneticInfo: phoneticInfoInterface[]
  meaning: meaningInterface[]
  timestamp?: Date
}

export class WordInfo {
  word: string | undefined
  phoneticInfo: PhoneticInfo[] | undefined
  meaning: Meaning[] | undefined
  timestamp: Date

  constructor (wordInfo?: wordInfoInterface) {
    if (wordInfo === undefined) {
      this.word = undefined
      this.phoneticInfo = undefined
      this.meaning = undefined
      this.timestamp = new Date()
    } else {
      this.word = wordInfo.word
      this.phoneticInfo = wordInfo.phoneticInfo
      this.meaning = wordInfo.meaning
      this.timestamp = wordInfo.timestamp || new Date()
    }
  }
}
