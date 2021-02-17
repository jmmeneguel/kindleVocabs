import { LookUp } from '../../core/classes/LookUp'
import { TrainingData } from '../../core/classes/TrainingData'
import { WordInfo } from '../../core/classes/WordInfo'

export interface databaseStateInterface {
  word: string
  stem: string
  meaning: WordInfo[] | undefined
  lookUps: LookUp[] | undefined
  trainingData: TrainingData | undefined
}

function state (): databaseStateInterface[] {
  return [{
    word: '',
    stem: '',
    meaning: undefined,
    lookUps: undefined,
    trainingData: undefined,
  }]
}

export default state
