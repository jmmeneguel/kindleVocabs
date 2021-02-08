export class Attempt {
  timestamp: Date
  userGrade: number

  constructor (userGrade: number) {
    this.userGrade = userGrade
    this.timestamp = new Date()
  }
}
