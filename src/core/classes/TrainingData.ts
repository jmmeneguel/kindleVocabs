import { Attempt, attemptInterface } from './Attempt'

export interface trainingDataInterface {
  id: string
  repetitionNumber?: number
  easinessFactor?: number
  interval?: number
  attemptHistory?: Attempt[]
}
export class TrainingData {
  id: string
  repetitionNumber: number
  easinessFactor: number
  interval: number
  attemptHistory: Attempt[]

  constructor(trainingData: trainingDataInterface) {
    this.id = trainingData.id
    this.repetitionNumber = trainingData.repetitionNumber || 0
    this.easinessFactor = trainingData.easinessFactor || 2.5
    this.interval = trainingData.interval || 0
    this.attemptHistory = trainingData.attemptHistory || []
  }

  addAttempt(userGrade: number) {
    const attemptData: attemptInterface = { userGrade: userGrade }
    const attempt = new Attempt(attemptData)
    this.attemptHistory.push(attempt)
    this.recalculate(userGrade)
  }

  recalculate(userGrade: number) {
    if (userGrade > 1) {
      // Correct response
      if (this.repetitionNumber === 0) {
        this.interval = 1
      } else if (this.repetitionNumber === 1) {
        this.interval = 6
      } else {
        this.interval *= this.easinessFactor
      }
      const easinessFactor: number =
        this.easinessFactor +
        0.1 -
        (5 - userGrade) * (0.08 + (5 - userGrade) * 0.02)
      this.easinessFactor = easinessFactor < 1.3 ? 1.3 : easinessFactor
      this.repetitionNumber += 1
    } else {
      // Incorrect response
      this.repetitionNumber = 0
      this.interval = 0
    }
  }
}
