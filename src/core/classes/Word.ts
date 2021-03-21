import { WordInfo, wordInfoInterface } from './WordInfo'
import { getMeaning } from '../func/apiRequest'
import { writeToIndexedDb } from '../func/manageIndexedDb'
import { TrainingData } from './TrainingData'

export interface WordInterface {
  id: string
  word: string
  stem: string
  lang: string
  wordInfo?: wordInfoInterface[]
  trainingData?: TrainingData[]
}
export class Word {
  id: string
  word: string
  stem: string
  lang: string
  wordInfo?: WordInfo[]
  trainingData?: TrainingData[]
  hidden: boolean

  constructor(word: WordInterface) {
    this.id = word.id
    this.word = word.word
    this.stem = word.stem
    this.lang = word.lang
    this.hidden = false
    if ('wordInfo' in word) {
      this.wordInfo = <WordInfo[]>(<unknown>word.wordInfo) || []
    } else {
      console.log('Searching for ' + this.stem)
      getMeaning(this)
        .then(res => {
          if (res === undefined) {
            console.log(this.word, res)
          }
          if (res.length > 0) {
            const wordInfos: WordInfo[] = []
            res.forEach(wordInfoData => {
              wordInfos.push(new WordInfo(wordInfoData))
            })
            this.wordInfo = wordInfos
          } else {
            this.wordInfo = [new WordInfo()]
          }
          writeToIndexedDb([this], 'database', 'words', true).catch(err =>
            console.log(err)
          )
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
