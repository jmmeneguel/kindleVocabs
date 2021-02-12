import { LookUp } from './LookUp'
import { TrainingData } from './TrainingData'

export class WordEntry {
  lookUp: LookUp
  trainingData: TrainingData
  id: string

  constructor (lookUp: LookUp) {
    this.id = lookUp.id
    this.lookUp = new LookUp(lookUp)
    this.trainingData = new TrainingData()
  }
}
