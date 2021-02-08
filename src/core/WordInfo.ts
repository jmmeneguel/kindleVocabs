import { PhoneticInfo } from './PhoneticInfo'
import { Meaning } from './Meaning'

export class WordInfo {
  phoneticInfo: PhoneticInfo
  meaning: Meaning

  constructor (phoneticInfo: PhoneticInfo, meaning: Meaning) {
    this.phoneticInfo = phoneticInfo
    this.meaning = meaning
  }
}
