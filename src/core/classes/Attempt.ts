export interface attemptInterface {
  timestamp?: Date
  userGrade: number
}

export class Attempt {
  timestamp: Date
  userGrade: number

  constructor (attempt: attemptInterface) {
    this.userGrade = attempt.userGrade
    this.timestamp = attempt.timestamp || new Date()
  }
}
