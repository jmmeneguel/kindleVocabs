import axios from 'axios'
import { Meaning } from '../classes/Meaning'
import { PhoneticInfo } from '../classes/PhoneticInfo'
import { WordInfo } from '../classes/WordInfo'

interface apiResponseType { data: { word: string, phonetics: PhoneticInfo[], meanings: Meaning[] }[] }

export async function getMeaning (word) {
  const lang: string = word.lang === 'pt' ? 'pt-BR' : word.lang
  const url = `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word.stem}`
  try {
    const res: apiResponseType = await axios.get(url)

    console.log(res)

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

    word.wordInfos = wordInfos
    return ({
      id: word.id,
      success: true
    })
  } catch (e) {
    console.log(e)
    return ({
      id: word.id,
      success: false
    })
  }
}