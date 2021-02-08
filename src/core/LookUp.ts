import { WordInfo } from './WordInfo'
import axios from '../../node_modules/axios'
import { PhoneticInfo } from './PhoneticInfo'
import { Meaning } from './Meaning'

export class LookUp {
  id: string
  word: string
  stem: string
  lang: string
  context: string
  timestamp: Date
  wordInfo: WordInfo

  constructor (id: string, word: string, stem: string, lang: string, context: string, timestamp: number) {
    this.id = id
    this.word = word
    this.stem = stem
    this.lang = lang
    this.context = context
    this.timestamp = new Date(timestamp)
  }

  async getMeaning () {
    const lang = this.lang === 'pt' ? 'pt-BR' : this.lang
    const url = `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${this.stem}`
    try {
      const res = await axios.get(url)
      console.log(res)
      // const phoneticInfo: PhoneticInfo = new PhoneticInfo(res.data[0].phonetics[0].text, res.data[0].phonetics[0].audio)
      // const meaning: Meaning = new Meaning(res.data[0].partOfSpeech, definition)
      // this.wordInfo = new WordInfo(phoneticInfo, meaning)
      // this.wordInfo = new WordInfo()
    } catch (e) {
      console.log(e)
    }
  }
}
