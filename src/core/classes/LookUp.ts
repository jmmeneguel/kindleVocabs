/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { WordInfo } from './WordInfo'
import axios from 'axios'
import { PhoneticInfo } from './PhoneticInfo'
import { Meaning } from './Meaning'
import { BookInfo } from './BookInfo'

interface apiResponseType { data: { word: string, phonetics: PhoneticInfo[], meanings: Meaning[] }[] }

export class LookUp {
  id: string
  word: string
  stem: string
  lang: string
  context: string
  timestamp: Date
  wordInfos: WordInfo[]
  bookInfo: BookInfo

  constructor (lookUp: { id: string, word: string, stem: string, lang: string, context: string, timestamp: number }, bookInfo: BookInfo) {
    this.id = lookUp.id
    this.word = lookUp.word
    this.stem = lookUp.stem
    this.lang = lookUp.lang
    this.context = lookUp.context
    this.timestamp = new Date(lookUp.timestamp)
    this.wordInfos = []
    this.bookInfo = bookInfo
  }

  async getMeaning () {
    const lang = this.lang === 'pt' ? 'pt-BR' : this.lang
    const url = `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${this.stem}`
    try {
      const res: apiResponseType = await axios.get(url)

      const wordInfos: WordInfo[] = []
      res.data.forEach(item => {
        const phonetics: PhoneticInfo[] = []
        item.phonetics.forEach(phoneticItem => {
          const phonetic = new PhoneticInfo(phoneticItem)
          phonetics.push(phonetic)
        })

        const meanings: Meaning[] = []
        item.meanings.forEach(meaningItem => {
          const meaning = new Meaning(meaningItem)
          meanings.push(meaning)
        })

        const wordInfo = new WordInfo(item.word, phonetics, meanings)
        wordInfos.push(wordInfo)
      })

      this.wordInfos = wordInfos
    } catch (e) {
      console.log(e)
    }
  }
}
