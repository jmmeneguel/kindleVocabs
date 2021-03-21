/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'
import { Meaning, meaningInterface } from '../classes/Meaning'
import { PhoneticInfo, phoneticInfoInterface } from '../classes/PhoneticInfo'
import { wordInfoInterface } from '../classes/WordInfo'
import { Word } from '../classes/Word'
import { DEV_MODE } from '../../util/constants'

interface apiResponseType {
  data: [
    {
      word: string
      phonetics: phoneticInfoInterface[]
      meanings: meaningInterface[]
    }
  ]
  status: number
}

export async function getMeaning(word: Word) {
  const lang: string = word.lang === 'pt' ? 'pt-BR' : word.lang

  const DEV_URL = 'http://127.0.0.1:5000/get'
  const PROD_URL = 'https://api.dictionaryapi.dev/api/v2/entries'

  const baseUrl = DEV_MODE ? DEV_URL : PROD_URL

  const url = `${baseUrl}/${lang}/${word.stem}`
  try {
    let res: apiResponseType = await axios.get(url)

    const wordInfos: wordInfoInterface[] = []
    if (typeof res.data === 'string') {
      console.log('res_data', res.data)
      res.data = JSON.parse(res.data)
    }
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
      const wordInfoData: wordInfoInterface = {
        word: item.word,
        phoneticInfo: phonetics,
        meaning: meanings
      }
      wordInfos.push(wordInfoData)
    })
    return wordInfos
  } catch (err) {
    console.log(err)
  }
}
