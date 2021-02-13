import { wordInfoInterface } from './WordInfo'
import { getMeaning } from '../func/apiRequest'

export interface wordInterface {
  id: string
  word: string
  stem: string
  lang: string
  wordInfo?: wordInfoInterface[]
}
export class Word {
  id: string
  word: string
  stem: string
  lang: string
  wordInfo?: wordInfoInterface[]

  constructor (word: wordInterface) {
    this.id = word.id
    this.word = word.word
    this.stem = word.stem
    this.lang = word.lang
    if ('wordInfo' in word) {
      this.wordInfo = word.wordInfo || []
    } else {
      if (this.id === 'en:stout') {
        getMeaning(this)
          .then(res => {
            this.wordInfo = res
            console.log(res)
            // IMPLEMENTAR: Atualizar a base dados
          })
          .catch(err => console.log(err))
      }
    }
  }
}
