import { Attempt } from './Attempt'

export class TrainingData {
  repetitionNumber: number
  easinessFactor: number
  interval: number
  attemptHistory: Attempt[]

  constructor (repetitionNumber: number, easinessFactor: number, interval: number) {
    this.repetitionNumber = repetitionNumber
    this.easinessFactor = easinessFactor
    this.interval = interval
    this.attemptHistory = []
  }

  addAttempt (userGrade: number) {
    const attempt = new Attempt(userGrade)
    this.attemptHistory.push(attempt)
  }

  recalculate (userGrade: number) {
    if (userGrade > 3) {
      // Correct response
      if (this.repetitionNumber === 0) {
        this.interval = 1
      } else if (this.repetitionNumber === 1) {
        this.interval = 6
      } else {
        this.interval *= this.easinessFactor
      }
      const easinessFactor : number = this.easinessFactor + 0.1 - (5 - userGrade) * (0.08 + (5 - userGrade) * 0.02)
      this.easinessFactor = easinessFactor < 1.3 ? 1.3 : easinessFactor
      this.repetitionNumber += 1
    } else {
      // Incorrect response
      this.repetitionNumber = 0
      this.interval = 1
    }
  }
}
