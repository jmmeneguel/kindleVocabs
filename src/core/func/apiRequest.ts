import axios from 'axios'
import { Meaning, meaningInterface } from '../classes/Meaning'
import { PhoneticInfo, phoneticInfoInterface } from '../classes/PhoneticInfo'
import { WordInfo, wordInfoInterface } from '../classes/WordInfo'
import { Word } from '../classes/Word'

interface apiResponseType { data: { word: string, phonetics: phoneticInfoInterface[], meanings: meaningInterface[] }[] }

export async function getMeaning (word: Word) {
  const lang: string = word.lang === 'pt' ? 'pt-BR' : word.lang
  const url = `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word.stem}`
  const res: apiResponseType = await axios.get(url)

  const wordInfos: wordInfoInterface[] = []
  res.data.forEach(item => {
    const phonetics: phoneticInfoInterface[] = []
    item.phonetics.forEach(phoneticItem => {
      const phonetic = new PhoneticInfo(phoneticItem)
      phonetics.push(phonetic)
    })

    const meanings: meaningInterface[] = []
    item.meanings.forEach(meaningItem => {
      const meaning = new Meaning(meaningItem)
      meanings.push(meaning)
    })
    const wordInfoData: wordInfoInterface = { word: item.word, phoneticInfo: phonetics, meaning: meanings }
    const wordInfo = new WordInfo(wordInfoData)
    wordInfos.push(wordInfo)
  })
  return wordInfos
}
