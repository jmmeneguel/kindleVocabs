import { Attempt } from './Attempt'

export class TrainingData {
  id: string
  repetitionNumber: number
  easinessFactor: number
  interval: number
  attemptHistory: Attempt[]

  constructor (id: string) {
    this.id = id
    this.repetitionNumber = 0
    this.easinessFactor = 2.5
    this.interval = 0
    this.attemptHistory = []
  }
}

export function addAttempt (trainingData: TrainingData, userGrade: number) {
  const attempt = new Attempt(userGrade)
  trainingData.attemptHistory.push(attempt)

  return trainingData
}

export function recalculate (trainingData: TrainingData, userGrade: number) {
  if (userGrade > 3) {
    // Correct response
    if (trainingData.repetitionNumber === 0) {
      trainingData.interval = 1
    } else if (trainingData.repetitionNumber === 1) {
      trainingData.interval = 6
    } else {
      trainingData.interval *= trainingData.easinessFactor
    }
    const easinessFactor : number = trainingData.easinessFactor + 0.1 - (5 - userGrade) * (0.08 + (5 - userGrade) * 0.02)
    trainingData.easinessFactor = easinessFactor < 1.3 ? 1.3 : easinessFactor
    trainingData.repetitionNumber += 1
  } else {
    // Incorrect response
    trainingData.repetitionNumber = 0
    trainingData.interval = 1
  }
  return trainingData
}
