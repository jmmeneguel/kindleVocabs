import { Word } from '../../core/classes/Word'
import { LookUp } from '../../core/classes/LookUp'
import { BookInfo } from '../../core/classes/BookInfo'
import { TrainingData } from '../../core/classes/TrainingData'

export interface databaseStateInterface {
  words: Word[],
  lookUps: LookUp[],
  bookInfos: BookInfo[],
  trainingData: TrainingData[]
}

function state (): databaseStateInterface {
  return {
    words: [],
    lookUps: [],
    bookInfos: [],
    trainingData: []
  }
}

export default state
