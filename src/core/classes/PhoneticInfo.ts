export interface phoneticInfoInterface {
  text: string
  audio: string
}

export class PhoneticInfo {
  text: string
  audio: string

  constructor (phonetic: phoneticInfoInterface) {
    this.text = phonetic.text
    this.audio = phonetic.audio
  }
}
