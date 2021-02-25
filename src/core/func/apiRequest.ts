/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'
import { Meaning, meaningInterface } from '../classes/Meaning'
import { PhoneticInfo, phoneticInfoInterface } from '../classes/PhoneticInfo'
import { wordInfoInterface } from '../classes/WordInfo'
import { Word } from '../classes/Word'

interface apiResponseType {
  data: [{ word: string, phonetics: phoneticInfoInterface[], meanings: meaningInterface[] }],
  status: number
}

export async function getMeaning (word: Word) {
  const lang: string = word.lang === 'pt' ? 'pt-BR' : word.lang
  const url = `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word.stem}`
  try {
    const res: apiResponseType = await axios.get(url)

    const wordInfos: wordInfoInterface[] = []
    res.data.forEach(item => {
      const phonetics: PhoneticInfo[] = []
      item.phonetics.forEach((phoneticItem: phoneticInfoInterface) => {
        const phonetic = new PhoneticInfo(phoneticItem)
        phonetics.push(phonetic)
      })
      const meanings: Meaning[] = []
      item.meanings.forEach((meaningItem: meaningInterface) => {
        const meaning = new Meaning(meaningItem)
        meanings.push(meaning)
      })
      const wordInfoData: wordInfoInterface = { word: item.word, phoneticInfo: phonetics, meaning: meanings }
      wordInfos.push(wordInfoData)
    })
    return wordInfos
  } catch (err) {
    if (err.response.status === 404) {
      return []
    } else {
      throw err
    }
  }
}
