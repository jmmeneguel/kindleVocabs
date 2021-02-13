import { PhoneticInfo, phoneticInfoInterface } from './PhoneticInfo'
import { Meaning, meaningInterface } from './Meaning'

export interface wordInfoInterface {
  word: string
  phoneticInfo: phoneticInfoInterface[]
  meaning: meaningInterface[]
  timestamp?: Date
}

export class WordInfo {
  word: string
  phoneticInfo: PhoneticInfo[]
  meaning: Meaning[]
  timestamp: Date

  constructor (wordInfo: wordInfoInterface) {
    this.word = wordInfo.word
    this.phoneticInfo = wordInfo.phoneticInfo
    this.meaning = wordInfo.meaning
    this.timestamp = wordInfo.timestamp || new Date()
  }
}
