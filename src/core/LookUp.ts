import { WordInfo } from './WordInfo'
import axios from '../../node_modules/axios'
import { PhoneticInfo } from './PhoneticInfo'
import { Meaning } from './Meaning'
import { BookInfo } from './BookInfo'

export class LookUp {
  id: string
  word: string
  stem: string
  lang: string
  context: string
  timestamp: Date
  wordInfos: WordInfo[]
  bookInfo: BookInfo

  constructor (id: string, word: string, stem: string, lang: string, context: string, bookInfo: BookInfo, timestamp: number) {
    this.id = id
    this.word = word
    this.stem = stem
    this.lang = lang
    this.context = context
    this.timestamp = new Date(timestamp)
    this.wordInfos = []
    this.bookInfo = bookInfo
  }

  async getMeaning () {
    const lang = this.lang === 'pt' ? 'pt-BR' : this.lang
    const url = `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${this.stem}`
    try {
      const res: {data: {word: string, phonetics: [{text: string, audio: string}], meanings: []}[]} = await axios.get(url)

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
