import { LookUp } from './LookUp'
import { TrainingData } from './TrainingData'

export class WordEntry {
  lookUp: LookUp
  trainingData: TrainingData

  constructor (lookUp: LookUp, trainingData: TrainingData) {
    this.lookUp = lookUp
    this.trainingData = trainingData
  }
}
